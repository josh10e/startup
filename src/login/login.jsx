import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function Login({ setIsLoggedIn, setUsername }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
  event.preventDefault();

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", usernameInput);

  setIsLoggedIn(true);
  setUsername(usernameInput);

  navigate("/divelog");}

  return (
    <main>
      <section className="content">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label><br />
          <input 
            type="text" 
            id="username" 
            name="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          /><br /><br />

          <label htmlFor="password">Password:</label><br />
          <input 
            type="password" 
            id="password" 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br /><br />

          <button type="submit">Login</button>
          
        </form>
      </section>
  </main>
  );
}