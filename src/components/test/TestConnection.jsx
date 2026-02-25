import React from "react";
import { useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function TestConnection() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase
        .from("events")
        .select("*")

      console.log("DATA:", data);
      console.log("ERROR:", error);
    }

    test();
  }, []);

  return <div>Testing Supabase...</div>;
}