import React from 'react';

export function Login() {
  return (
    <main>
    <nav className="sidebar">
        <h2>Pages</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/diveplanner">Plan a Dive</a></li>
          <li><a href="/divelog">Log a Dive</a></li>
          <li><a href="https://github.com/josh10e/startup">Startup Repository</a></li>
        </ul>
      </nav>

      <section className="content">
        <h2>Login</h2>
        <form>
          <label htmlFor="username">Username:</label><br />
          <input type="text" id="username" name="username" /><br /><br />

          <label htmlFor="password">Password:</label><br />
          <input type="password" id="password" name="password" /><br /><br />

          <button type="submit">Login</button>
        </form>
      </section>
  </main>
  );
}