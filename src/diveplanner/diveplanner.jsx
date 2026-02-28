import React, { useState } from 'react';
import '../app.css';

export function DivePlanner() {
  const [numDives, setNumDives] = useState(1);
  const [waterType, setWaterType] = useState("salt");
  const [dives, setDives] = useState([
    { gas: "air", o2: 32, depth: 0 }
  ]);

  const updateDive = (index, field, value) => {
    const newDives = [...dives];
    if (field === "o2") {
      const clamped = Math.max(21, Math.min(40, Number(value)));
      newDives[index][field] = clamped;
    } else {
      newDives[index][field] = value;
    }
    setDives(newDives);
  };

  const handleNumDivesChange = (n) => {
    setNumDives(n);
    const newDives = [...dives];
    while (newDives.length < n) newDives.push({ gas: "air", o2: 32, depth: 0 });
    setDives(newDives.slice(0, n));
  };

  return (
    <main>
      <section className="content">
        <h2 className="page-title">Dive Planner</h2>

        <div className="selector-group">
        <h4>Number of dives</h4>
        <div className="dive-selector">
          {[1,2,3,4].map((n) => (
            <button
              key={n}
              type="button"
              className={`dive-btn ${numDives===n ? 'active' : ''}`}
              onClick={() => handleNumDivesChange(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

        <div className="selector-group">
        <h4>Water Type</h4>
        <div className="water-selector">
          {["salt","fresh"].map((type) => (
            <button
              key={type}
              type="button"
              className={`water-btn ${waterType===type ? 'active' : ''}`}
              onClick={() => setWaterType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

        <div className="dive-templates-container">
          {dives.slice(0, numDives).map((dive, idx) => {
            const fractionO2 = dive.gas === "air" ? 0.21 : dive.o2 / 100;
            const ambientPressure = 1 + dive.depth / 33;
            const ppo2 = (fractionO2 * ambientPressure).toFixed(2);
            if (idx >= 1 && dive.surfaceInterval === undefined) {
              dive.surfaceInterval = 0; // default to 0 min
            }

            return (
              <section key={idx} className="dive-template">
                <h3>Dive {idx+1}</h3>

                <div className="form-group gas-row">
                  <select
                    value={dive.gas}
                    onChange={(e) => updateDive(idx, "gas", e.target.value)}
                  >
                    <option value="air">Air (21% O₂)</option>
                    <option value="nitrox">Nitrox</option>
                  </select>

                  {dive.gas === "nitrox" && (
                    <div className="nitrox-slider">
                      <input
                        type="range"
                        min="21"
                        max="40"
                        value={dive.o2}
                        onChange={(e) => updateDive(idx, "o2", e.target.value)}
                      />
                      <input
                        type="number"
                        min="21"
                        max="40"
                        value={dive.o2}
                        onChange={(e) => updateDive(idx, "o2", e.target.value)}
                      /> %
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Planned Depth (ft):</label><br />
                  <input
                    type="number"
                    min="0"
                    value={dive.depth}
                    onChange={(e) => updateDive(idx, "depth", Number(e.target.value))}
                  />
                </div>

                <ul className="dive-outputs">
                  {idx >= 1 && (
                    <li>Starting PG: <strong>--</strong></li>
                  )}

                  <li>{idx === 0 ? "NDL" : "ANDL"}: <strong>-- min</strong></li>

                  <li>PPO₂: <strong>{ppo2} atm</strong></li>
                  <li>Pressure Group: <strong>--</strong></li>

                  {idx < 3 && (
                    <li>
                      Surface Interval (min):{" "}
                      <input
                        type="number"
                        min="0"
                        value={dive.surfaceInterval}
                        onChange={(e) => updateDive(idx, "surfaceInterval", Number(e.target.value))}
                        style={{width:"60px"}}
                      />
                    </li>
                  )}
                </ul>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}