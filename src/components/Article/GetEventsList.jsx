import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Article from "./Article";

export default function GetEventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getSupaBaseList() {
      const { data, error } = await supabase.from("events_list").select("*").limit(18);

      if (data) {
        console.log("DATA:", data);       
      }
      if (error) {
        console.error("ERROR:", error);     
      }
      
       setEvents(data ?? []); // если дата есть ставим в переменую евентс дату если нет то Null или undefindet
    }

    getSupaBaseList();
  }, []);

  return (
    <div className="conteiner">
      {events.map((event) => (
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
