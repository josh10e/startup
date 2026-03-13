import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';
import './example_dives.jsx';

export function DiveLog() {
  const [dives, setDives] = useState([]);
  const [expandedTrips, setExpandedTrips] = useState({});
  const [expandedDives, setExpandedDives] = useState({});
  const navigate = useNavigate();

  function toggleTrip(trip) {
    setExpandedTrips(prev => ({
      ...prev,
      [trip]: !prev[trip]
    }));
  }

  function toggleDive(id) {
    setExpandedDives(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }

  useEffect(() => {
    (async () => {
      const me = await fetch("/api/user/me", { credentials: "include" });
      if (!me.ok) {
        navigate("/");
        return;
      }
      const stored = JSON.parse(localStorage.getItem("dives") || "[]");
      setDives(stored);
    })();
  }, []);

  const trips = [...new Set(dives.map(d => d.trip))];
  const divesByTrip = trips.reduce((acc, trip) => {
    acc[trip] = dives.filter(d => d.trip === trip);
    return acc;
  }, {});

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
                  <span>{trip}</span>
                  <span>{expandedTrips[trip] ? "▲" : "▼"}</span>
                </button>

                {expandedTrips[trip] && (
                  <ul className="trip-dives">
                    {divesByTrip[trip].map(dive => {
                      const psiUsed = dive.beginningPsi - dive.endingPsi;

                      return (
                        <li key={dive.id} className="dive-entry">

                          <button
                            className="dive-toggle-btn"
                            onClick={() => toggleDive(dive.id)}
                          >
                            <span>
                              {dive.location}
                            </span>
                            <span>{expandedDives[dive.id] ? "▲" : "▼"}</span>
                          </button>

                          {expandedDives[dive.id] && (
                            <div className="dive-details">

                              <div className="dive-main">
                                <p><strong>Date:</strong> {dive.date}</p>
                                <p><strong>Max Depth:</strong> {dive.maxDepth} ft</p>
                                <p><strong>Time:</strong> {dive.underwaterTime} min</p>
                                <p><strong>PSI Used:</strong> {psiUsed} psi</p>
                                <p><strong>Gas Mix:</strong> {dive.gas}</p>
                              </div>

                              <div className="dive-secondary">
                                <p><strong>Air Temp:</strong> {dive.airTemp}°F</p>
                                <p><strong>Avg Water Temp:</strong> {dive.waterTemp}°F</p>
                                <p><strong>Visibility:</strong> {dive.visibility}</p>
                                <p><strong>Current:</strong> {dive.current}</p>
                                <p><strong>Weight:</strong> {dive.weight} lbs</p>
                              </div>

                            </div>
                          )}

                        </li>
                      );
                    })}
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