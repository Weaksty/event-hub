import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Article from "./Article";
export default function GetEventsList() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function test() {
      const  { data, error } = await supabase.from("events_list").select("*").limit(20);
      if (data) {
        console.log("DATA:", data);
        setEvents(data);
      } else {
        console.error("ERROR:", error);
      }
    }
    test();
  }, []);
  return (
    <div className="conteiner">
      {events.map(event => (
          <Article 
            key={event.id}
            image={event.image}
            category={event.category}
            title={event.title}
            date={event.event_date}
            deadline={`Регестрация до: ${event.deadline}`}
            taken_places={`${event.taken_places} +`}
            city={event.city}
      />
      ))}
    </div>
  );
}