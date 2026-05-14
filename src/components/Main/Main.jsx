import React from 'react'
import './Main.css'
import Example from "./DatePicker";
import ExampleTo from "./DataPickerTo";
import { useState } from "react";
import GetEventsList from '../Article/GetEventsList';
import { useMemo } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";


function Main() {
    const [view, setView] = useState(() => {
        if (typeof window !== "undefined" && window.innerWidth < 1000) {
            return "list"
        }

        return "grid"
    });
    const [sortBy, setSortBy] = useState("")
    const [regeonFilter, setRegeonFilter] = useState([])
    const [dateTo, setDateTo] = useState(null)
    const [date, setDate] = useState(null)
    const [attendanceFilter, setAttendanceFilter] = useState([])
    const [category, setcategory] = useState([])
    const [toggleR, setToggleRegion] = useState(false);
    const [toggleD, setToggleDates] = useState(false);
    const [toggleA, setToggleAttendance] = useState(false);
    const [toggleE, setToggleEvents] = useState(false);

    function regeonFilterFunction(e) {
        const value = e.target.value
        const checked = e.target.checked
        if (checked) {
            setRegeonFilter(prev => [...prev, value])
        } else {
            setRegeonFilter(prev => prev.filter(e => e !== value))
        }
    }
    function attendanceFilterFunction(e) {
        const value = e.target.value
        const checked = e.target.checked
        if (checked) {
            setAttendanceFilter(prev => [...prev, value])
        } else {
            setAttendanceFilter(prev => prev.filter(e => e !== value))
        }
    }
    function categoryFunction(e) {
        const value = e.target.value
        const checked = e.target.checked
        if (checked) {
            setcategory(prev => [...prev, value])
        } else {
            setcategory(prev => prev.filter(e => e !== value))
        }
    }

    const filters = useMemo(() => {
        function formatDateForDB(date) {
            if (!date) return null
            const y = date.getFullYear()
            const m = String(date.getMonth() + 1).padStart(2, "0")
            const d = String(date.getDate()).padStart(2, "0")
            return `${y}-${m}-${d}`
        }
        return {
            sortBy,
            region: regeonFilter,
            date: formatDateForDB(date),
            dateTo: formatDateForDB(dateTo),
            attendance: attendanceFilter,
            category
        }
    }, [sortBy, regeonFilter, date, dateTo, attendanceFilter, category])

    return (
        <div className='conteinerMain'>
            <main className='events-main'>


                <aside className='aside'>

                    <h1>FILTERS</h1>
                    <h2>Sort by</h2>
                    <select name="one" id="select" onChange={(e) => setSortBy(e.target.value)}>
                        <option value="DeadlineSoonestFirst" >Deadline: soonest first</option>
                        <option value="three">Deadline: latest first</option>
                        <option value="four">Event Name: A - Z</option>
                        <option value="five">Event Name: Z - A</option>
                        <option value="six">Attendance: lowest first</option>
                        <option value="seven">Attendance: highest first</option>
                        <option value="eight">Price: highest first</option>
                        <option value="nine">Price: lowest first</option>
                        <option value="ten">Start: highest first</option>
                    </select>


                    <div className='conteinerAside'>
                        <div className='asidecontent'>
                            <h2>Region</h2>
                            <button className='bthRegion' id='bthRegion' onClick={() => setToggleRegion(!toggleR)}>
                                <svg className={`svg ${toggleR ? 'rotated' : ''}`} width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0747 3.60546L17.3234 0.917969L10.1548 8.24533L2.82741 1.07797L0.138672 3.83048L10.2187 13.6855L20.0747 3.60546Z" fill="#828282"></path></svg>
                            </button>
                        </div>

                        <div id='bthRDiv'>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="dolnoslaskie" onChange={regeonFilterFunction} value="Dolnoslaskie" /><label htmlFor="dolnoslaskie">Dolnoslaskie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="kujawsko-pomorskie" onChange={regeonFilterFunction} value="kujawsko-pomorskie" /><label htmlFor="kujawsko-pomorskie" >Kujawsko-pomorskie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="lubelskie" onChange={regeonFilterFunction} value="lubelskie" /><label htmlFor="lubelskie">Lubelskie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="lubuskie" onChange={regeonFilterFunction} value="lubuskie" /><label htmlFor="lubuskie">Lubuskie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="lodzkie" onChange={regeonFilterFunction} value="lodzkie" /><label htmlFor="lodzkie">Lodzkie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="malopolskie" onChange={regeonFilterFunction} value="malopolskie" /><label htmlFor="malopolskie">Malopolskie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="mazowieckie" onChange={regeonFilterFunction} value="mazowieckie" /><label htmlFor="mazowieckie">Mazowieckie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="opolskie" onChange={regeonFilterFunction} value="opolskie" /><label htmlFor="opolskie">Opolskie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="podkarpackie" onChange={regeonFilterFunction} value="podkarpackie" /><label htmlFor="podkarpackie">Podkarpackie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="podlaskie" onChange={regeonFilterFunction} value="podlaskie" /><label htmlFor="podlaskie">Podlaskie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="pomorskie" onChange={regeonFilterFunction} value="pomorskie" /><label htmlFor="pomorskie">Pomorskie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="slaskie" onChange={regeonFilterFunction} value="slaskie" /><label htmlFor="slaskie">Slaskie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="swietokrzyskie" onChange={regeonFilterFunction} value="swietokrzyskie" /><label htmlFor="swietokrzyskie">Swietokrzyskie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="warminsko-mazurskie" onChange={regeonFilterFunction} value="warminsko-mazurskie" /><label htmlFor="warminsko-mazurskie">Warminsko-mazurskie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="wielkopolskie" onChange={regeonFilterFunction} value="wielkopolskie" /><label htmlFor="wielkopolskie">Wielkopolskie</label></div>
                            <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="zachodniopomorskie" onChange={regeonFilterFunction} value="zachodniopomorskie" /><label htmlFor="zachodniopomorskie">Zachodniopomorskie</label></div>
                        </div>
                    </div>

                    <div className='conteinerAside' >
                        <div className='asidecontent'>
                            <h2>Dates</h2>
                            <button className='bthDates' onClick={() => setToggleDates(!toggleD)}>
                                <svg className={`svg ${toggleD ? 'rotated' : ""}`} width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0747 3.60546L17.3234 0.917969L10.1548 8.24533L2.82741 1.07797L0.138672 3.83048L10.2187 13.6855L20.0747 3.60546Z" fill="#828282"></path></svg>
                            </button>
                        </div>


                        <div className='bthDatesDiv'>
                            <div className={`regionDiv ${toggleD ? 'enabled' : 'disabled'}`}>
                                <div className='bthDatesDiv'>
                                    <Example
                                        placeholder="From"
                                        date={date}
                                        setDate={setDate}
                                    />
                                    <ExampleTo
                                        dateTo={dateTo}
                                        setDateTo={setDateTo}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='conteinerAside'>
                        <div className='asidecontent'>
                            <h2>Attendance</h2>
                            <button className='bthAttendance' id='bthAttendance' onClick={() => setToggleAttendance(!toggleA)}>
                                <svg className={`svg ${toggleA ? 'rotated' : ""}`} width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0747 3.60546L17.3234 0.917969L10.1548 8.24533L2.82741 1.07797L0.138672 3.83048L10.2187 13.6855L20.0747 3.60546Z" fill="#828282"></path></svg>
                            </button>
                        </div>


                        <div className='bthAttendanceDiv'>
                            <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`} ><input className="attendanceDiv-checkbox" type="checkbox" id="500-" value={'500-'} onChange={attendanceFilterFunction} /><label htmlFor="500-">Under 500</label></div>
                            <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range500-1000" value={'500-999'} onChange={attendanceFilterFunction} /><label htmlFor="range500-1000">500-999</label></div>
                            <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range1000-2000" value={'1000-1999'} onChange={attendanceFilterFunction} /><label htmlFor="range1000-2000">1000-1999</label></div>
                            <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range2000-5000" value={'2000-4999'} onChange={attendanceFilterFunction} /><label htmlFor="range2000-4999">2000-4999</label></div>
                            <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range5000-7499" value={'5000-7499'} onChange={attendanceFilterFunction} /><label htmlFor="range5000-7499">5000-7499</label></div>
                            <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range7500-9999" value={'7500-9999'} onChange={attendanceFilterFunction} /><label htmlFor="range7500-9999">7500-9999</label></div>
                            <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range10000-20000" value={'10000-19999'} onChange={attendanceFilterFunction} /><label htmlFor="range10000-19999">10000-19999</label></div>
                            <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range20000-50000" value={'20000-49999'} onChange={attendanceFilterFunction} /><label htmlFor="range20000-50000">20000-49999</label></div>
                            <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range50000-99999" value={'50000-99999'} onChange={attendanceFilterFunction} /><label htmlFor="range50000-99999">50000-99999</label></div>
                            <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="over100000" value={'100000+'} onChange={attendanceFilterFunction} /><label htmlFor="over100000">Over 100000</label></div>
                        </div>
                    </div>


                    <div className='conteinerAside'>
                        <div className='asidecontent'>
                            <h2>Event/Venue Type</h2>
                            <button className='bthEvent' id='bthEvent' onClick={() => setToggleEvents(!toggleE)}>
                                <svg className={`svg ${toggleE ? 'rotated' : ""}`} width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0747 3.60546L17.3234 0.917969L10.1548 8.24533L2.82741 1.07797L0.138672 3.83048L10.2187 13.6855L20.0747 3.60546Z" fill="#828282"></path></svg>
                            </button>
                        </div>
                        <div className='bthEventDiv'>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`} ><input className="eventtype-checkbox" type="checkbox" id="air-show" value={'air-show'} onChange={categoryFunction} /><label htmlFor="air-show">Air Show</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="animal" value={'animal'} onChange={categoryFunction} /><label htmlFor="animal">Animal</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="arts-festival" value={'arts-festival'} onChange={categoryFunction} /><label htmlFor="arts-festival">Arts Festival</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="arts-crafts" value={'arts-crafts'} onChange={categoryFunction} /><label htmlFor="arts-crafts">Arts and Crafts</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="auto-show" value={'auto-show'} onChange={categoryFunction} /><label htmlFor="auto-show">Auto Show</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="beer/wine" value={'beer/wine'} onChange={categoryFunction} /><label htmlFor="beer/wine">Beer/Wine</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="business" value={'business'} onChange={categoryFunction} /><label htmlFor="business">Business</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="boat-show" value={'boat-show'} onChange={categoryFunction} /><label htmlFor="boat-show">Boat Show</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="celebrity-event" value={'celebrity-event'} onChange={categoryFunction} /><label htmlFor="celebrity-event">Celebrity Event</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="charity" value={'charity'} onChange={categoryFunction} /><label htmlFor="charity">Charity</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="cultural" value={'cultural'} onChange={categoryFunction} /><label htmlFor="cultural">Cultural</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="education" value={'education'} onChange={categoryFunction} /><label htmlFor="education">Education</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="farmers" value={'farmers'} onChange={categoryFunction} /><label htmlFor="farmers">Farmers</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="market" value={'market'} onChange={categoryFunction} /><label htmlFor="market">Market</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="food" value={'food'} onChange={categoryFunction} /><label htmlFor="food">Food</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="general" value={'general'} onChange={categoryFunction} /><label htmlFor="general">General</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="fair" value={'fair'} onChange={categoryFunction} /><label htmlFor="fair">Fair</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="home-and-garden-show" value={'home-and-garden-show'} onChange={categoryFunction} /><label htmlFor="home-and-garden-show">Home and Garden Show</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="lifestyle-intercept" value={'lifestyle-intercept'} onChange={categoryFunction} /><label htmlFor="lifestyle-intercept">Lifestyle Intercept</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="motorstyle-show" value={'motorstyle-show'} onChange={categoryFunction} /><label htmlFor="motorstyle-show">Motorstyle Show</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="motorsport" value={'motorsport'} onChange={categoryFunction} /><label htmlFor="motorsport">Motorsport</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="music" value={'music'} onChange={categoryFunction} /><label htmlFor="music">Music</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="pride" value={'pride'} onChange={categoryFunction} /><label htmlFor="pride">Pride</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="parade" value={'parade'} onChange={categoryFunction} /><label htmlFor="parade">Parade</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="party" value={'party'} onChange={categoryFunction} /><label htmlFor="party">Party</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="seasonal" value={'seasonal'} onChange={categoryFunction} /><label htmlFor="seasonal">Seasonal</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="sporting" value={'sporting'} onChange={categoryFunction} /><label htmlFor="sporting">Sporting</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="street-festival" value={'street-festival'} onChange={categoryFunction} /><label htmlFor="street-festival">Street Festival</label></div>
                            <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="trade-show" value={'trade-show'} onChange={categoryFunction} /><label htmlFor="trade-show">Trade Show</label></div>

                        </div>
                    </div>
                </aside>


                <div className='conteinerEventLits'>
                    <div>
                        <div>

                        </div>
                    </div>

                    <div className='conteinerResult'>
                        <div className='conteinerResults'>
                            <h2>Results</h2>
                            <div className="viewSwitch">
                                <button
                                    onClick={() => setView("grid")}
                                    className={view === "grid" ? "switchBtn active" : "switchBtn"}
                                >
                                    <BsFillGridFill size={16} />
                                </button>

                                <button
                                    onClick={() => setView("list")}
                                    className={view === "list" ? "switchBtn active" : "switchBtn"}
                                >
                                    <FaListUl size={16} />
                                </button>

                                <div
                                    className={`slider ${view === "list" ? "move" : ""}`}
                                />

                            </div>
                        </div>

                        <div className={view === "grid" ? "conteiner grid" : "conteiner list"}>
                            <GetEventsList filters={filters} view={view} />
                        </div>
                    </div>
                </div>



            </main>
        </div>
    )
}

export default Main
