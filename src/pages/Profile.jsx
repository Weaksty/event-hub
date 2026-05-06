import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowRightOnRectangle, HiOutlineUserCircle } from "react-icons/hi2";
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

    useEffect(() => {
        let isActive = true;

        async function loadProfile(userId) {
            const { data, error } = await supabase
                .from("profiles")
                .select("full_name")
                .eq("id", userId)
                .maybeSingle();

            if (!isActive) return;

            if (error) {
                console.warn("Profile load error:", error.message);
                setProfile(null);
                return;
            }

            setProfile(data);
        }

        async function loadUser() {
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

            setLoading(false);
        }

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                const currentUser = session?.user ?? null;
                setUser(currentUser);
                setProfile(null);

                if (currentUser) {
                    await loadProfile(currentUser.id);
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
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "Event Hub user";

    return (
        <div className="profile-page">
            <Header />
            <main className="profile-main">
                <section className="profile-card">
                    <div className="profile-avatar" aria-hidden="true">
                        {getInitials(displayName, user.email)}
                    </div>

                    <h1>{displayName}</h1>
                    <p>{user.email}</p>

                    <button type="button" className="profile-logout" onClick={logout}>
                        <HiOutlineArrowRightOnRectangle />
                        Logout
                    </button>
                </section>
            </main>
            <Footer />
        </div>
    );
}
