import React, { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { Login } from './login/login';
import { DivePlanner } from './diveplanner/diveplanner';
import { DiveLog } from './divelog/divelog';
import { NewDive } from './divelog/newdive';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  return (
    <BrowserRouter>
      <AppBody
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        username={username}
        setUsername={setUsername}
      />
    </BrowserRouter>
  );
}

function AppBody({ isLoggedIn, setIsLoggedIn, username, setUsername }) {
  const navigate = useNavigate();

  async function handleLogout() {
    await fetch(`/api/auth/logout`, { method: 'DELETE', credentials: 'include' });
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  }

  return (
    <div className="app-body">
      <header>
        <h1 className="header">Scuba Buddy</h1>
        {isLoggedIn && (<p className="user-display">Welcome, {username}</p>)}
      </header>

      <div className="main-container">
        <nav className="sidebar">
          <h2>Pages</h2>
          <ul>
            {!isLoggedIn && <li><NavLink to="/">Login</NavLink></li>}
            <li><NavLink to="/diveplanner">Plan a Dive</NavLink></li>
            {isLoggedIn && <li><NavLink to="/divelog">Logbook</NavLink></li>}
            {isLoggedIn && (
              <li style={{ marginTop: 15 }}>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/divelog" replace /> :
                <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}
            />
            <Route path="/diveplanner" element={<DivePlanner />} />
            <Route path="/divelog" element={isLoggedIn ? <DiveLog /> : <Navigate to="/" replace />} />
            <Route path="/newdive" element={isLoggedIn ? <NewDive /> : <Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      <footer>
        <a href="https://github.com/josh10e/startup" target="_blank">Startup Repository</a>
      </footer>
    </div>
  );
}

function NotFound() {
  return (
    <section className="content">
      <h2>404: Page not found</h2>
      <p>Return to sender. Address unknown.</p>
    </section>
  );
}