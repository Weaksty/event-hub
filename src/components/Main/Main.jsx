import React from 'react'
import './Main.css'
import DatePicker from "react-datepicker";
import Example from "./DatePicker";
import ExampleTo from "./DataPickerTo";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import GetEventsList from '../Article/GetEventsList';


function Main(){
        const [toggleR, setToggleRegion] = useState(false);
        const [toggleD, setToggleDates] = useState(false);
        const [toggleA, setToggleAttendance] = useState(false);
        const [toggleE, setToggleEvents] = useState(false);
    return(
        <main>
            
<aside className='aside'>

    <h1>FILTERS</h1>
    <h2>Sort by</h2>
        <select name="one" id="select">
            <option value="one" selected>Date</option>
            <option value="two">Deadline: soonest first</option>
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
                <button className='bthRegion'id='bthRegion'  onClick={() => setToggleRegion(!toggleR) }>
                    <svg className={`svg ${toggleR ? 'rotated' : ''}`} width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0747 3.60546L17.3234 0.917969L10.1548 8.24533L2.82741 1.07797L0.138672 3.83048L10.2187 13.6855L20.0747 3.60546Z" fill="#828282"></path></svg>
                </button>
                </div>


                <div id='bthRDiv'>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="dolnoslaskie"/><label htmlFor="dolnoslaskie">Dolnośląskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="kujawsko-pomorskie"/><label htmlFor="kujawsko-pomorskie">Kujawsko-pomorskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="lubelskie"/><label htmlFor="lubelskie">Lubelskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="lubuskie"/><label htmlFor="lubuskie">Lubuskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="lodzkie"/><label htmlFor="lodzkie">Łódzkie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="malopolskie"/><label htmlFor="malopolskie">Małopolskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="mazowieckie"/><label htmlFor="mazowieckie">Mazowieckie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="opolskie"/><label htmlFor="opolskie">Opolskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="podkarpackie"/><label htmlFor="podkarpackie">Podkarpackie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="podlaskie"/><label htmlFor="podlaskie">Podlaskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="pomorskie"/><label htmlFor="pomorskie">Pomorskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="slaskie"/><label htmlFor="slaskie">Śląskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="swietokrzyskie"/><label htmlFor="swietokrzyskie">Świętokrzyskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="warmińsko-mazurskie"/><label htmlFor="warmińsko-mazurskie">Warmińsko-mazurskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="wielkopolskie"/><label htmlFor="wielkopolskie">Wielkopolskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`}><input className="region-checkbox" type="checkbox" id="zachodniopomorskie"/><label htmlFor="zachodniopomorskie">Zachodniopomorskie</label></div>
                </div>
                </div>


                <div className='conteinerAside' >
                    <div className='asidecontent'>
                        <h2>Dates</h2>
                        <button className='bthDates' onClick={() => setToggleDates(!toggleD) }>
                            <svg className={`svg ${toggleD ? 'rotated' : ""}`} width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0747 3.60546L17.3234 0.917969L10.1548 8.24533L2.82741 1.07797L0.138672 3.83048L10.2187 13.6855L20.0747 3.60546Z" fill="#828282"></path></svg>
                        </button>
                    </div>

        
                <div className='bthDatesDiv'>
                    <div className={`regionDiv ${toggleD ? 'enabled' : 'disabled'}`}> 
                        <div className='bthDatesDiv'>
                    <Example  placeholder = "From"/>
                    <ExampleTo placeholder="To" />
                        </div>
                    </div>
                </div>
                </div>


                <div className='conteinerAside'>
                    <div className='asidecontent'>
                        <h2>Attendance</h2>
                        <button className='bthAttendance' id='bthAttendance' onClick={() => setToggleAttendance(!toggleA) }>
                            <svg className={`svg ${toggleA ? 'rotated' : ""}`} width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0747 3.60546L17.3234 0.917969L10.1548 8.24533L2.82741 1.07797L0.138672 3.83048L10.2187 13.6855L20.0747 3.60546Z" fill="#828282"></path></svg>
                        </button>
                    </div>


                <div className='bthAttendanceDiv'>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-number" type="number" id="enter-attendance" placeholder='Enter min attendance'/><button className="attendanceDiv-button">Apply</button></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`} ><input className="attendanceDiv-checkbox" type="checkbox" id="Under-500"/><label htmlFor="Under-500">Under 500</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range500-1000"/><label htmlFor="range500-1000">500-1000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range1000-2000"/><label htmlFor="range1000-2000">1000-2000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range2000-5000"/><label htmlFor="range2000-5000">2000-5000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range5000-7500"/><label htmlFor="range5000-7500">5000-7500</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range7500-10000"/><label htmlFor="range7500-10000">7500-10000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range10000-20000"/><label htmlFor="range10000-20000">10000-20000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range20000-50000"/><label htmlFor="range20000-50000">20000-50000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range50000-100000"/><label htmlFor="range50000-100000">50000-100000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="over100000"/><label htmlFor="over100000">Over 100000</label></div>
                </div>
                </div>


                <div className='conteinerAside'>
                    <div className='asidecontent'>
                        <h2>Event/Venue Type</h2>
                        <button className='bthEvent' id='bthEvent' onClick={() => setToggleEvents(!toggleE) }>
                            <svg className={`svg ${toggleE ? 'rotated' : ""}`} width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0747 3.60546L17.3234 0.917969L10.1548 8.24533L2.82741 1.07797L0.138672 3.83048L10.2187 13.6855L20.0747 3.60546Z" fill="#828282"></path></svg>
                        </button>
                    </div>
                <div className='bthEventDiv'>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`} ><input className="eventtype-checkbox" type="checkbox" id="air-show"/><label htmlFor="air-show">Air Show</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="animal"/><label htmlFor="animal">Animal</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="arts-festival"/><label htmlFor="arts-festival">Arts Festival</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="arts-crafts"/><label htmlFor="arts-crafts">Arts and Crafts</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="auto-show"/><label htmlFor="auto-show">Auto Show</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="beer/wine"/><label htmlFor="beer/wine">Beer/Wine</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="business"/><label htmlFor="business">Business</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="boat-show"/><label htmlFor="boat-show">Boat Show</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="celebrity-event"/><label htmlFor="celebrity-event">Celebrity Event</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="charity"/><label htmlFor="charity">Charity</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="cultural"/><label htmlFor="cultural">Cultural</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="education"/><label htmlFor="education">Education</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="farmers"/><label htmlFor="farmers">Farmers</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="market"/><label htmlFor="market">Market</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="food"/><label htmlFor="food">Food</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="general"/><label htmlFor="general">General</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="fair"/><label htmlFor="fair">Fair</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="home-and-garden-show"/><label htmlFor="home-and-garden-show">Home and Garden Show</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="lifestyle-intercept"/><label htmlFor="lifestyle-intercept">Lifestyle Intercept</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="motorstyle-show"/><label htmlFor="motorstyle-show">Motorstyle Show</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="motorsport"/><label htmlFor="motorsport">Motorsport</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="Music"/><label htmlFor="music">Music</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="Pride"/><label htmlFor="pride">Pride</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="parade"/><label htmlFor="parade">Parade</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="party"/><label htmlFor="party">Party</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="seasonal"/><label htmlFor="seasonal">Seasonal</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="sporting"/><label htmlFor="sporting">Sporting</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="street-festival"/><label htmlFor="street-festival">Street Festival</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="trade-show"/><label htmlFor="trade-show">Trade Show</label></div>
                    
                </div>
                </div>
            </aside>
              <GetEventsList />            
            
        </main>
    )
}

export default Main
