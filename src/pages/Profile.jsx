import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    HiOutlineArrowRightOnRectangle,
    HiOutlineCheck,
    HiOutlinePencilSquare,
    HiOutlineUserCircle,
    HiOutlineXMark,
} from "react-icons/hi2";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { supabase } from "../components/Article/supabaseClient";
import "./Profile.css";

function getInitials(name, email) {
    const source = name || email || "Event Hub";

    return source
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("");
}

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [nameDraft, setNameDraft] = useState("");
    const [descriptionDraft, setDescriptionDraft] = useState("");
    const [confirmAction, setConfirmAction] = useState(null);


    useEffect(() => {
        let isActive = true;

        async function loadProfile(userId) {
            try {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("full_name, bio")
                    .eq("id", userId)
                    .maybeSingle();

                if (!isActive) return;

                if (error) {
                    console.warn("Profile load error:", error.message);
                    setProfile(null);
                    return;
                }

                setProfile(data);
            } catch (error) {
                if (!isActive) return;
                console.warn("Profile load error:", error.message);
                setProfile(null);
            }
        }

        async function loadUser() {
            try {
                const { data, error } = await supabase.auth.getSession();

                if (!isActive) return;

                if (error) {
                    console.warn("Session load error:", error.message);
                }

                const currentUser = data.session?.user ?? null;
                setUser(currentUser);

                if (currentUser) {
                    await loadProfile(currentUser.id);
                }
            } catch (error) {
                if (!isActive) return;
                console.warn("Session load error:", error.message);
                setUser(null);
                setProfile(null);
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        }

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                const currentUser = session?.user ?? null;
                setUser(currentUser);
                setProfile(null);

                if (currentUser) {
                    setLoading(true);
                    setTimeout(() => {
                        loadProfile(currentUser.id).finally(() => {
                            if (isActive) {
                                setLoading(false);
                            }
                        });
                    }, 0);
                } else {
                    setLoading(false);
                }
            }
        );

        loadUser();

        return () => {
            isActive = false;
            authListener.subscription.unsubscribe();
        };
    }, []);

    async function logout() {
        await supabase.auth.signOut();
        navigate("/login");
    }

    async function updateName() {
        const { error } = await
            supabase
                .from(
                    'profiles'
                )
                .update({
                    full_name
                        : nameDraft
                })
                .eq(
                    'id'
                    , user.id
                );

        if (error) {
            console.warn("Name update error:", error.message);
        }
    }

    async function updateDescription() {
        const { error } = await
            supabase
                .from(
                    'profiles'
                )
                .update({
                    bio
                        : descriptionDraft
                })
                .eq(
                    'id'
                    , user.id
                );

        if (error) {
            console.warn("Description update error:", error.message);
        }
    }

    async function confirmProfileChange() {
        if (!confirmAction) return;

        if (confirmAction.type === "name") {
            await updateName(nameDraft);
            setProfile((currentProfile) => ({
                ...currentProfile,
                full_name: nameDraft.trim(),
            }));
            setIsEditingName(false);
        }

        if (confirmAction.type === "description") {
            await updateDescription(descriptionDraft);
            setProfile((currentProfile) => ({
                ...currentProfile,
                bio: descriptionDraft.trim(),
            }));
            setIsEditingDescription(false);
        }

        setConfirmAction(null);
    }

    if (loading) {
        return (
            <div className="profile-page">
                <Header />
                <main className="profile-main">
                    <div className="profile-loading">Loading profile...</div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-page">
                <Header />
                <main className="profile-main">
                    <section className="profile-card">
                        <HiOutlineUserCircle className="profile-empty-icon" />
                        <h1>Profile is locked</h1>
                        <p>Log in to see your profile.</p>
                        <Link to="/login" className="profile-login-link">
                            Log in
                        </Link>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    const displayName =
        profile?.full_name ||
        user.user_metadata?.full_name

    const description =
        profile?.bio ||
        "No description yet. Add a short intro so your profile feels more personal.";

    function startNameEdit() {
        setNameDraft(displayName);
        setIsEditingName(true);
    }

    function startDescriptionEdit() {
        setDescriptionDraft(description);
        setIsEditingDescription(true);
    }

    function cancelNameEdit() {
        setNameDraft(displayName);
        setIsEditingName(false);
    }

    function cancelDescriptionEdit() {
        setDescriptionDraft(description);
        setIsEditingDescription(false);
    }

    function requestNameSave() {
        if (!nameDraft.trim() || nameDraft.trim() === displayName) {
            cancelNameEdit();
            return;
        }

        setConfirmAction({
            type: "name",
            title: "Change profile name?",
            message: "Your new name will be shown on your Event Hub profile.",
        });
    }

    function requestDescriptionSave() {
        if (descriptionDraft.trim() === description) {
            cancelDescriptionEdit();
            return;
        }

        setConfirmAction({
            type: "description",
            title: "Update description?",
            message: "This description will appear on your profile page.",
        });
    }

    return (
        <div className="profile-page">
            <Header />
            <main className="profile-main">
                <section className="profile-shell">
                    <div className="profile-hero">
                        <div className="profile-avatar" aria-hidden="true">
                            {getInitials(displayName, user.email)}
                        </div>

                        <div className="profile-identity">
                            <span className="profile-status">Signed in</span>
                            <h1>{displayName}</h1>
                            <p>{user.email}</p>
                        </div>

                        <button type="button" className="profile-logout" onClick={logout}>
                            <HiOutlineArrowRightOnRectangle />
                            Logout
                        </button>
                    </div>

                    <div className="profile-panel">
                        <div className="profile-section-heading">
                            <div>
                                <span>Profile</span>
                                <h2>Personal information</h2>
                            </div>
                        </div>

                        <div className="profile-field">
                            <div className="profile-field-copy">
                                <span>Name</span>
                                {isEditingName ? (
                                    <input
                                        className="profile-input"
                                        value={nameDraft}
                                        onChange={(event) => setNameDraft(event.target.value)}
                                        maxLength={60}
                                        autoFocus
                                    />
                                ) : (
                                    <strong>{displayName}</strong>
                                )}
                            </div>

                            {isEditingName ? (
                                <div className="profile-actions">
                                    <button type="button" className="profile-icon-button confirm" onClick={requestNameSave} aria-label="Save name">
                                        <HiOutlineCheck />
                                    </button>
                                    <button type="button" className="profile-icon-button" onClick={cancelNameEdit} aria-label="Cancel name edit">
                                        <HiOutlineXMark />
                                    </button>
                                </div>
                            ) : (
                                <button type="button" className="profile-edit-button" onClick={startNameEdit}>
                                    <HiOutlinePencilSquare />
                                    Edit
                                </button>
                            )}
                        </div>

                        <div className="profile-field profile-field-top">
                            <div className="profile-field-copy">
                                <span>Description</span>
                                {isEditingDescription ? (
                                    <textarea
                                        className="profile-textarea"
                                        value={descriptionDraft}
                                        onChange={(event) => setDescriptionDraft(event.target.value)}
                                        maxLength={220}
                                        rows={4}
                                        autoFocus
                                    />
                                ) : (
                                    <p>{description}</p>
                                )}
                            </div>

                            {isEditingDescription ? (
                                <div className="profile-actions">
                                    <button type="button" className="profile-icon-button confirm" onClick={requestDescriptionSave} aria-label="Save description">
                                        <HiOutlineCheck />
                                    </button>
                                    <button type="button" className="profile-icon-button" onClick={cancelDescriptionEdit} aria-label="Cancel description edit">
                                        <HiOutlineXMark />
                                    </button>
                                </div>
                            ) : (
                                <button type="button" className="profile-edit-button" onClick={startDescriptionEdit}>
                                    <HiOutlinePencilSquare />
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {confirmAction && (
                <div className="profile-modal-backdrop" role="presentation">
                    <section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-confirm-title">
                        <h2 id="profile-confirm-title">{confirmAction.title}</h2>
                        <p>{confirmAction.message}</p>

                        <div className="profile-modal-actions">
                            <button type="button" className="profile-modal-secondary" onClick={() => setConfirmAction(null)}>
                                Cancel
                            </button>
                            <button type="button" className="profile-modal-primary" onClick={confirmProfileChange}>
                                Confirm
                            </button>
                        </div>
                    </section>
                </div>
            )}

            <Footer />
        </div>
    );
}
