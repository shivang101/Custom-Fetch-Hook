import React, { useState } from "react";
import "./TripList.css";
import { useFetch } from "../hooks/useFetch";

export default function TripList() {
  const [url, setUrl] = useState("http://localhost:3000/trips");

  const { data: trips, isPending, error } = useFetch(url, { type: "GET" });

  // const fetchTrips = useCallback(async () => {
  //   const response = await fetch(url);
  //   const json = await response.json();
  //   setTrips(json);
  // }, [url]);

  // useEffect(() => {
  //   fetchTrips();
  // }, [fetchTrips]);
  // console.log(trips);

  return (
    <div className="trip-list">
      <h2>TripList</h2>
      {isPending && <div>Loading Trips...</div>}
      {error && <div>{error}</div>}
      <ul>
        {trips &&
          trips.map((trip) => {
            return (
              <li key={trip.id}>
                <h3>{trip.title}</h3>
                <p>{trip.price}</p>
              </li>
            );
          })}
      </ul>
      <div className="filters">
        <button
          onClick={() => setUrl("http://localhost:3000/trips?loc=europe")}
        >
          European Trips
        </button>
        <button
          onClick={() => setUrl("http://localhost:3000/trips?loc=america")}
        >
          American trips
        </button>
        <button onClick={() => setUrl("http://localhost:3000/trips")}>
          All trips
        </button>
      </div>
    </div>
  );
}
