import React, { useEffect } from 'react'
import './Main.css'
import Example from "./DatePicker";
import ExampleTo from "./DataPickerTo";
import { useState } from "react";
import GetEventsList from '../Article/GetEventsList';
import { useMemo } from "react";

function Main(){
        const [sortBy, setSortBy] = useState("")
        const [regeonFilter, setRegeonFilter] = useState([])
        const [dateTo, setDateTo] = useState(null)
        const [date, setDate] = useState(null)
        const [attendanceFilter, setAttendanceFilter] = useState([])
        const [eventTypeFilter, setEventTypeFilter] = useState([])
        const [toggleR, setToggleRegion] = useState(false);
        const [toggleD, setToggleDates] = useState(false);
        const [toggleA, setToggleAttendance] = useState(false);
        const [toggleE, setToggleEvents] = useState(false);
        

        function regeonFilterFunction(e){
            const value = e.target.value
            const checked = e.target.checked
            if(checked){
                setRegeonFilter(prev => [...prev,value])
            }else{
                setRegeonFilter(prev => prev.filter(e => e !== value ))
            }
        }
        function attendanceFilterFunction(e){
            const value = e.target.value
            const checked = e.target.checked
            if(checked){
                setAttendanceFilter(prev => [...prev,value])
            }else{
                setAttendanceFilter(prev => prev.filter(e => e !== value ))
            }
        }
        function eventTypeFilterFunction(e){
            const value = e.target.value
            const checked = e.target.checked
            if(checked){
                setEventTypeFilter(prev => [...prev,value])
            } else {
                setEventTypeFilter(prev => prev.filter(e => e !== value))
            }
        } 

        const filters = useMemo(() =>{
            function formatDateForDB(date){
                if (!date) return null
            const y = date.getFullYear()
            const m = String(date.getMonth() + 1).padStart(2, "0")
            const d = String(date.getDate()).padStart(2, "0")
            return `${y}-${m}-${d}`}
            return{
            sortBy,
            region:regeonFilter,
            date: formatDateForDB(date),
            dateTo:formatDateForDB(dateTo),
            attendanceFilter,
            eventTypeFilter
            }
        },[sortBy,regeonFilter,date,dateTo,attendanceFilter,eventTypeFilter])
        console.log(filters)
        console.log(regeonFilter)
    return(
        <main>
            
<aside className='aside'>

    <h1>FILTERS</h1>
    <h2>Sort by</h2>
        <select name="one" id="select" onChange={(e) => setSortBy(e.target.value)}>
            <option value="Date" >Date</option>
            <option value="DeadlineSoonestFirst">Deadline: soonest first</option>
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
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="dolnoslaskie" onChange={regeonFilterFunction } value="Dolnoslaskie" /><label htmlFor="dolnoslaskie">Dolnoslaskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="kujawsko-pomorskie" onChange={regeonFilterFunction } value="kujawsko-pomorskie"/><label htmlFor="kujawsko-pomorskie" >Kujawsko-pomorskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="lubelskie" onChange={regeonFilterFunction } value="lubelskie"/><label htmlFor="lubelskie">Lubelskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="lubuskie" onChange={regeonFilterFunction } value="lubuskie"/><label htmlFor="lubuskie">Lubuskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="lodzkie" onChange={regeonFilterFunction } value="lodzkie"/><label htmlFor="lodzkie">Lodzkie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="malopolskie" onChange={regeonFilterFunction } value="malopolskie"/><label htmlFor="malopolskie">Malopolskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="mazowieckie" onChange={regeonFilterFunction } value="mazowieckie"/><label htmlFor="mazowieckie">Mazowieckie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="opolskie" onChange={regeonFilterFunction } value="opolskie"/><label htmlFor="opolskie">Opolskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="podkarpackie" onChange={regeonFilterFunction } value="podkarpackie"/><label htmlFor="podkarpackie">Podkarpackie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="podlaskie"onChange={regeonFilterFunction } value="podlaskie"/><label htmlFor="podlaskie">Podlaskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="pomorskie" onChange={regeonFilterFunction } value="pomorskie"/><label htmlFor="pomorskie">Pomorskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="slaskie" onChange={regeonFilterFunction } value="slaskie"/><label htmlFor="slaskie">Slaskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="swietokrzyskie"onChange={regeonFilterFunction } value="swietokrzyskie"/><label htmlFor="swietokrzyskie">Swietokrzyskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="warminsko-mazurskie" onChange={regeonFilterFunction } value="warminsko-mazurskie"/><label htmlFor="warminsko-mazurskie">Warminsko-mazurskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="wielkopolskie" onChange={regeonFilterFunction } value="wielkopolskie"/><label htmlFor="wielkopolskie">Wielkopolskie</label></div>
                <div className={`regionDiv ${toggleR ? 'enabled' : 'disabled'}`} ><input className="region-checkbox" type="checkbox" id="zachodniopomorskie" onChange={regeonFilterFunction } value="zachodniopomorskie"/><label htmlFor="zachodniopomorskie">Zachodniopomorskie</label></div>
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
                    <Example  
                    placeholder = "From"
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
                        <button className='bthAttendance' id='bthAttendance' onClick={() => setToggleAttendance(!toggleA) }>
                            <svg className={`svg ${toggleA ? 'rotated' : ""}`} width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0747 3.60546L17.3234 0.917969L10.1548 8.24533L2.82741 1.07797L0.138672 3.83048L10.2187 13.6855L20.0747 3.60546Z" fill="#828282"></path></svg>
                        </button>
                    </div>


                <div className='bthAttendanceDiv'>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`} ><input className="attendanceDiv-checkbox" type="checkbox" id="Under-500" value={'500'} onChange={attendanceFilterFunction}/><label htmlFor="Under-500">Under 500</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range500-1000" value={'500-1000'} onChange={attendanceFilterFunction}/><label htmlFor="range500-1000">500-1000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range1000-2000" value={'1000-2000'} onChange={attendanceFilterFunction}/><label htmlFor="range1000-2000">1000-2000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range2000-5000" value={'2000-5000'} onChange={attendanceFilterFunction}/><label htmlFor="range2000-5000">2000-5000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range5000-7500" value={'5000-7500'} onChange={attendanceFilterFunction}/><label htmlFor="range5000-7500">5000-7500</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range7500-10000" value={'7500-10000'} onChange={attendanceFilterFunction}/><label htmlFor="range7500-10000">7500-10000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range10000-20000" value={'10000-20000'} onChange={attendanceFilterFunction}/><label htmlFor="range10000-20000">10000-20000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range20000-50000"  value={'20000-50000'}onChange={attendanceFilterFunction}/><label htmlFor="range20000-50000">20000-50000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="range50000-100000" value={'50000-100000'} onChange={attendanceFilterFunction}/><label htmlFor="range50000-100000">50000-100000</label></div>
                    <div className={`attendanceDiv ${toggleA ? 'enabled' : 'disabled'}`}><input className="attendanceDiv-checkbox" type="checkbox" id="over100000" value={'100000'} onChange={attendanceFilterFunction}/><label htmlFor="over100000">Over 100000</label></div>
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
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`} ><input className="eventtype-checkbox" type="checkbox" id="air-show" value={'air-show'} onChange={eventTypeFilterFunction}/><label htmlFor="air-show">Air Show</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="animal" value={'animal'} onChange={eventTypeFilterFunction}/><label htmlFor="animal">Animal</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="arts-festival" value={'arts-festival'} onChange={eventTypeFilterFunction}/><label htmlFor="arts-festival">Arts Festival</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="arts-crafts" value={'arts-crafts'} onChange={eventTypeFilterFunction}/><label htmlFor="arts-crafts">Arts and Crafts</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="auto-show" value={'auto-show'} onChange={eventTypeFilterFunction}/><label htmlFor="auto-show">Auto Show</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="beer/wine" value={'beer/wine'} onChange={eventTypeFilterFunction}/><label htmlFor="beer/wine">Beer/Wine</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="business" value={'business'} onChange={eventTypeFilterFunction}/><label htmlFor="business">Business</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="boat-show" value={'boat-show'} onChange={eventTypeFilterFunction}/><label htmlFor="boat-show">Boat Show</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="celebrity-event" value={'celebrity-event'} onChange={eventTypeFilterFunction}/><label htmlFor="celebrity-event">Celebrity Event</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="charity" value={'charity'} onChange={eventTypeFilterFunction}/><label htmlFor="charity">Charity</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="cultural" value={'cultural'} onChange={eventTypeFilterFunction}/><label htmlFor="cultural">Cultural</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="education" value={'education'} onChange={eventTypeFilterFunction}/><label htmlFor="education">Education</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="farmers" value={'farmers'} onChange={eventTypeFilterFunction}/><label htmlFor="farmers">Farmers</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="market" value={'market'} onChange={eventTypeFilterFunction}/><label htmlFor="market">Market</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="food" value={'food'} onChange={eventTypeFilterFunction}/><label htmlFor="food">Food</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="general" value={'general'} onChange={eventTypeFilterFunction}/><label htmlFor="general">General</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="fair" value={'fair'} onChange={eventTypeFilterFunction}/><label htmlFor="fair">Fair</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="home-and-garden-show" value={'home-and-garden-show'} onChange={eventTypeFilterFunction}/><label htmlFor="home-and-garden-show">Home and Garden Show</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="lifestyle-intercept" value={'lifestyle-intercept'} onChange={eventTypeFilterFunction}/><label htmlFor="lifestyle-intercept">Lifestyle Intercept</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="motorstyle-show" value={'motorstyle-show'} onChange={eventTypeFilterFunction}/><label htmlFor="motorstyle-show">Motorstyle Show</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="motorsport" value={'motorsport'} onChange={eventTypeFilterFunction}/><label htmlFor="motorsport">Motorsport</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="music" value={'music'} onChange={eventTypeFilterFunction}/><label htmlFor="music">Music</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="pride" value={'pride'} onChange={eventTypeFilterFunction}/><label htmlFor="pride">Pride</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="parade" value={'parade'} onChange={eventTypeFilterFunction}/><label htmlFor="parade">Parade</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="party" value={'party'} onChange={eventTypeFilterFunction}/><label htmlFor="party">Party</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="seasonal" value={'seasonal'} onChange={eventTypeFilterFunction}/><label htmlFor="seasonal">Seasonal</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="sporting" value={'sporting'} onChange={eventTypeFilterFunction}/><label htmlFor="sporting">Sporting</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="street-festival" value={'street-festival'} onChange={eventTypeFilterFunction}/><label htmlFor="street-festival">Street Festival</label></div>
                    <div className={`eventDiv ${toggleE ? 'enabled' : 'disabled'}`}><input className="eventtype-checkbox" type="checkbox" id="trade-show" value={'trade-show'} onChange={eventTypeFilterFunction}/><label htmlFor="trade-show">Trade Show</label></div>
                    
                </div>
                </div>
            </aside>
              <GetEventsList
               filters={filters}
               />       
              
            
        </main>
    )
}

export default Main
