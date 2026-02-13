import React from 'react';

export function DiveLog() {
  return (
    <main>
    <section class="content">
    <h2 class="page-title">Dive Log</h2>

    <p class="highlight">
      This is where previous dives logged by the user will show up
    </p>

    <section>
      <h3>Previous Dives</h3>

      <ul>
        <li>
          EXAMPLE (real dive I've done)<br />
          Location: Cozumel - Palancar Gardens<br />
          Date: 8-2-25<br />
          Max Depth: 88 ft<br />
          Future dives will be retrieved and shown here
        </li>
      </ul>
    </section>

    <section>
      <h3>Log a New Dive</h3>
      <p>
        Clicking this button will allow the user to enter details for a new dive.
      </p>

      <button type="button">Log New Dive</button>
    </section>

    <section>
      <h3>Realtime Updates</h3>
      <p>
        New dives logged will appear here in real time.
      </p>
    </section>
    </section>
  </main>
  );
}