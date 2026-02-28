import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function DiveLog() {
  const [dives, setDives] = useState([]);
  const [expandedTrips, setExpandedTrips] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("dives") || "[]");
    setDives(stored);
  }, []);

  const trips = [...new Set(dives.map(d => d.trip))];

  const toggleTrip = (trip) => {
    setExpandedTrips(prev => ({ ...prev, [trip]: !prev[trip] }));
  };

  const handleNewDive = () => {
    navigate("/newdive");
  };

  return (
    <main>
      <section className="content">
        <h2 className="page-title">Dive Log</h2>

        <section>
          <h3>Previous Dives</h3>
          {dives.length === 0 ? (
            <p>No dives logged</p>
          ) : (
            trips.map((trip, idx) => (
              <div key={idx} className="trip-row">
                <button
                  className="trip-toggle-btn"
                  onClick={() => toggleTrip(trip)}
                >
                  {trip} {expandedTrips[trip] ? "▲" : "▼"}
                </button>

                {expandedTrips[trip] && (
                  <ul className="trip-dives">
                    {dives
                      .filter(d => d.trip === trip)
                      .map((dive, i) => (
                        <li key={i} className="dive-entry">
                          <strong>{dive.location}</strong><br />
                          Date: {dive.date}<br />
                          Max Depth: {dive.maxDepth} ft<br />
                          Underwater Time: {dive.time} min<br />
                          Beginning PSI: {dive.startPsi}<br />
                          Ending PSI: {dive.endPsi}<br />
                          Gas Mix: {dive.gas}<br />
                          Air Temp: {dive.airTemp}°C<br />
                          Avg Water Temp: {dive.waterTemp}°C<br />
                          Visibility: {dive.visibility}<br />
                          Current: {dive.current}<br />
                          Weight: {dive.weight} lbs
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </section>

        <section>
          <button type="button" onClick={handleNewDive}>Log New Dive</button>
        </section>
      </section>
    </main>
  );
}