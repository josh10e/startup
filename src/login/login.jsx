import React from 'react';

export function Login() {
  return (
    <main>
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