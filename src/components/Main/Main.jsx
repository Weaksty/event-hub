import React from 'react'
import './Main.css'
import Article from '../Article/Article'
import GetEventsList from '../Article/GetEventsList';
function Main(){
    function openBth(){
const bthRegion = document.getElementById('bthRegion');
const bthDates = document.getElementById('bthDates');
const bthAttendance = document.getElementById('bthAttendance');
const bthEvent = document.getElementById('bthEvent');


    }
    return(
        <main>
            
            <aside className='aside'>
                <h1>FILTERS</h1>
                <h2>Sort by</h2>
                <select name="one" id="select">
                    <option value="one">Date</option>
                    <option value="two">Price</option>
                    <option value="three">Popularity</option>
                </select>
                <div className='conteinerAside'>
                <h2>Region</h2>
                
                <button className='bthRegion' id='bthRegion'>
                    <svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0747 3.60546L17.3234 0.917969L10.1548 8.24533L2.82741 1.07797L0.138672 3.83048L10.2187 13.6855L20.0747 3.60546Z" fill="#828282"></path></svg>
                </button>
                </div>
                <div className='conteinerAside' >
                <h2>Dates</h2>
                <button className='bthDates' id='bthDates'>
                    <svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0747 3.60546L17.3234 0.917969L10.1548 8.24533L2.82741 1.07797L0.138672 3.83048L10.2187 13.6855L20.0747 3.60546Z" fill="#828282"></path></svg>
                </button>
                </div>
                <div className='conteinerAside'>
                <h2>Attendance</h2>
                <button className='bthAttendance' id='bthAttendance'>
                    <svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0747 3.60546L17.3234 0.917969L10.1548 8.24533L2.82741 1.07797L0.138672 3.83048L10.2187 13.6855L20.0747 3.60546Z" fill="#828282"></path></svg>
                </button>
                </div>
                <div className='conteinerAside'>
                <h2>Event/Venue Type</h2>
                <button className='bthEvent' id='bthEvent'>
                    <svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0747 3.60546L17.3234 0.917969L10.1548 8.24533L2.82741 1.07797L0.138672 3.83048L10.2187 13.6855L20.0747 3.60546Z" fill="#828282"></path></svg>
                </button>
                </div>
            </aside>
              <GetEventsList />              
            
        </main>
    )
}

export default Main
