import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function Login({ setIsLoggedIn}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function Login(event) {
    event.preventDefault();

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);

    navigate("/divelog");
  }

  function Logout() {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <main>
      <section className="content">
        <h2>Login</h2>

        <form onSubmit={Login}>
          <label htmlFor="username">Username:</label><br />
          <input 
            type="text" 
            id="username" 
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br /><br />

          <label htmlFor="password">Password:</label><br />
          <input 
            type="password" 
            id="password" 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br /><br />

          <button type="submit" onClick={Login}>Login</button>
          <button type="button" onClick={Logout}>Logout</button>
          
        </form>
      </section>
  </main>
  );
}