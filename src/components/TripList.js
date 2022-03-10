import React, { useState, useEffect } from "react";
import "./TripList.css";
export default function TripList() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/trips")
      .then((res) => res.json())
      .then((data) => setTrips(data));
  }, []);
  console.log(trips);

  return (
    <div className="trip-list">
      <h2>TripList</h2>
      <ul>
        {trips.map((trip) => {
          return (
            <li key={trip.id}>
              <h3>{trip.title}</h3>
              <p>{trip.price}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
