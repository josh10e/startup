import React, { useState } from 'react';
import '../app.css';

export function DivePlanner() {
  const [gas, setGas] = useState("air");
  const [o2, setO2] = useState(32);       // Oxygen percentage
  const [depth, setDepth] = useState(0);  // Planned depth in feet
  const fractionO2 = o2 / 100;
  const ambientPressure = 1 + depth / 33;
  const ppo2 = (gas === "air" ? 0.21 : fractionO2 * ambientPressure).toFixed(2);

  const handleO2Change = (value) => {
    const clamped = Math.max(21, Math.min(40, Number(value)));
    setO2(clamped);
  };

  return (
    <main>
      <section className="content">
        <h2 className="page-title">Dive Planner</h2>
        <form>
          <section className="inputs">
            <h3>Inputs</h3>

            <div className="form-group">
              <label htmlFor="gas">Gas Mix:</label><br />
              <select
                id="gas"
                value={gas}
                onChange={(e) => setGas(e.target.value)}
              >
                <option value="air">Air (21% O₂)</option>
                <option value="nitrox">Nitrox</option>
              </select>
            </div>

            {gas === "nitrox" && (
              <div className="form-group nitrox-only">
                <label htmlFor="o2slider">Oxygen Percentage:</label><br />
                <input
                  type="range"
                  id="o2slider"
                  min="21"
                  max="40"
                  value={o2}
                  onChange={(e) => handleO2Change(e.target.value)}
                />
                <input
                  type="number"
                  id="o2value"
                  min="21"
                  max="40"
                  value={o2}
                  onChange={(e) => handleO2Change(e.target.value)}
                /> %
              </div>
            )}

            <div className="form-group">
              <label htmlFor="depth">Planned Depth (ft):</label><br />
              <input
                type="number"
                id="depth"
                value={depth}
                min="0"
                onChange={(e) => setDepth(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="water">Water Type:</label><br />
              <select id="water">
                <option value="salt">Salt</option>
                <option value="fresh">Fresh</option>
              </select>
            </div>
          </section>

          <section className="outputs">
            <h3>Outputs</h3>
            <ul>
              <li>NDL: <strong>-- min</strong></li>
              <li>PPO₂: <strong>{ppo2} atm</strong></li>
              <li>Pressure Group: <strong>--</strong></li>
            </ul>
          </section>
        </form>
      </section>
    </main>
  );
}