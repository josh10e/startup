import React from 'react';
import '../app.css';

export function DivePlanner() {
  return (
    <main>
    <section class="content">
      <h2 class="page-title">Dive Planner</h2>
      <form>
          <section class="inputs">
            <h3>Inputs</h3>

            <div class="form-group">
              <label for="gas">Gas Mix:</label><br />
              <select id="gas" name="gas">
                <option value="air">Air (21% O₂)</option>
                <option value="nitrox">Nitrox</option>
              </select>
            </div>

            <div class="form-group nitrox-only">
              <label for="o2slider">Oxygen Percentage:</label><br />
              <input
                type="range"
                id="o2slider"
                min="21"
                max="40"
                value="32"
                oninput="o2value.value = this.value"
              />
              <input
                type="number"
                id="o2value"
                min="21"
                max="40"
                value="32"
              /> %
            </div>

            <div class="form-group">
              <label for="depth">Planned Depth (ft):</label><br />
              <input type="number" id="depth"/>
            </div>

            <div class="form-group">
              <label for="water">Water Type:</label><br />
              <select id="water">
                <option value="salt">Salt</option>
                <option value="fresh">Fresh</option>
              </select>
            </div>
          </section>

          <section class="outputs">
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