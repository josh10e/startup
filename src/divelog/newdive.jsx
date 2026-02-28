import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function NewDive() {
  const navigate = useNavigate();
  const [dives, setDives] = useState([]);
  const [trips, setTrips] = useState([]);

  const [trip, setTrip] = useState("New");
  const [newTripTitle, setNewTripTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [maxDepth, setMaxDepth] = useState("");
  const [time, setTime] = useState("");
  const [startPsi, setStartPsi] = useState("");
  const [endPsi, setEndPsi] = useState("");
  const [gas, setGas] = useState("Air");
  const [o2, setO2] = useState(32);
  const [airTemp, setAirTemp] = useState("");
  const [waterTemp, setWaterTemp] = useState("");
  const [visibility, setVisibility] = useState("Moderate");
  const [current, setCurrent] = useState("Moderate");
  const [weight, setWeight] = useState(10);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("dives") || "[]");
    setDives(stored);
    const uniqueTrips = [...new Set(stored.map(d => d.trip))];
    setTrips(uniqueTrips);
  }, []);

  const handleO2Change = (value) => {
    const clamped = Math.max(21, Math.min(40, Number(value)));
    setO2(clamped);
  };

  const formatDate = (input) => {
    if (!input) return "";
    const d = new Date(input);
    const mm = d.getMonth() + 1;
    const dd = d.getDate();
    const yy = d.getFullYear().toString().slice(-2);
    return `${mm}/${dd}/${yy}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTrip = trip === "New" ? newTripTitle : trip;
    const newDive = {
      trip: finalTrip,
      location,
      date: formatDate(date),
      maxDepth,
      time,
      startPsi,
      endPsi,
      gas: gas === "Nitrox" ? `Nitrox ${o2}%` : "Air",
      airTemp,
      waterTemp,
      visibility,
      current,
      weight
    };
    localStorage.setItem("dives", JSON.stringify([...dives, newDive]));
    navigate("/divelog");
  };

  return (
    <main>
      <section className="content">
        <h2 className="page-title">Log a New Dive</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Dive Trip:</label><br/>
            <select value={trip} onChange={e => setTrip(e.target.value)}>
              <option value="New">New</option>
              {trips.map((t, idx) => <option key={idx} value={t}>{t}</option>)}
            </select>
            {trip === "New" && (
              <input
                type="text"
                value={newTripTitle}
                onChange={e => setNewTripTitle(e.target.value)}
                placeholder="Dive Trip title"
                style={{marginTop: "5px"}}
                required
              />
            )}
          </div>

          <div className="form-group">
            <label>Location: </label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Date: </label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Max Depth (ft): </label>
            <input type="number" value={maxDepth} onChange={e => setMaxDepth(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Underwater Time (min):</label>
            <input type="number" value={time} onChange={e => setTime(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Beginning PSI:</label>
            <input type="number" value={startPsi} onChange={e => setStartPsi(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Ending PSI:</label>
            <input type="number" value={endPsi} onChange={e => setEndPsi(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Gas Mix:</label>
            <select value={gas} onChange={e => setGas(e.target.value)}>
              <option value="Air">Air</option>
              <option value="Nitrox">Nitrox</option>
            </select>
            {gas === "Nitrox" && (
              <div className="nitrox-slider">
                <input
                  type="range"
                  min="21"
                  max="40"
                  value={o2}
                  onChange={e => handleO2Change(e.target.value)}
                />
                <input
                  type="number"
                  min="21"
                  max="40"
                  value={o2}
                  onChange={e => handleO2Change(e.target.value)}
                  style={{width:"50px"}}
                /> %
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Air Temperature (°C):</label>
            <input type="number" value={airTemp} onChange={e => setAirTemp(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Avg Water Temp (°C):</label>
            <input type="number" value={waterTemp} onChange={e => setWaterTemp(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Visibility:</label>
            <select value={visibility} onChange={e => setVisibility(e.target.value)}>
              <option value="Poor (<30ft)">Poor (&lt;30ft)</option>
              <option value="Moderate (30-60ft)">Moderate (30-60ft)</option>
              <option value="Great (60-100ft)">Great (60-100ft)</option>
              <option value="Superb (100ft+)">Superb (100ft+)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Current:</label>
            <select value={current} onChange={e => setCurrent(e.target.value)}>
              <option value="Weak">Weak</option>
              <option value="Moderate">Moderate</option>
              <option value="Strong">Strong</option>
            </select>
          </div>

          <div className="form-group">
            <label>Weight (lbs):</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
          </div>

          <button type="submit">Save Dive</button>
        </form>
      </section>
    </main>
  );
}