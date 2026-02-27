import React, { useState } from 'react';
import '../app.css';

export function DivePlanner() {
  const [gas, setGas] = useState("air");    // track selected gas
  const [o2, setO2] = useState(32);        // track O2 percentage

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
                name="gas"
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
                  onChange={(e) => setO2(Number(e.target.value))}
                />
                <input
                  type="number"
                  id="o2value"
                  min="21"
                  max="40"
                  value={o2}
                  onChange={(e) => setO2(Number(e.target.value))}
                /> %
              </div>
            )}

            <div className="form-group">
              <label htmlFor="depth">Planned Depth (ft):</label><br />
              <input type="number" id="depth"/>
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
              <li>PPO₂: <strong>-- atm</strong></li>
              <li>Pressure Group: <strong>--</strong></li>
            </ul>
          </section>

        </form>
      </section>
    </main>
  );
}