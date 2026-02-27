import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { Login } from './login/login';
import { DivePlanner } from './diveplanner/diveplanner';
import { DiveLog } from './divelog/divelog';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  setIsLoggedIn(false);
  setUsername("");
}

  return (
    <BrowserRouter>
      <div className="app-body">
        <header>
          <h1 className="header">Dive Planner</h1>
          {isLoggedIn && (<p className="user-display">Welcome, {username}</p>)}
        </header>

        <div className="main-container">
          <nav className="sidebar">
            <h2>Pages</h2>
            <ul>
              {!isLoggedIn && (
                <li>
                  <NavLink className="nav-link" to="/">Login</NavLink>
                </li>
              )}

              <li>
                <NavLink className="nav-link" to="/diveplanner">Plan a Dive</NavLink>
              </li>

              {isLoggedIn && (
                <li>
                  <NavLink className="nav-link" to="/divelog">Log a Dive</NavLink>
                </li>
              )}

              {isLoggedIn && (
                <li style={{ marginTop: "15px" }}> {/* space below the links */}
                  <button 
                    className="login-button"  // same class as your login button
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              )}

            </ul>
          </nav>

          <main className="content">
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn
                    ? <Navigate to="/divelog" replace />
                    : <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
                }
              />
              <Route
                path="/diveplanner"
                element={<DivePlanner />}
              />

              <Route
                path="/divelog"
                element={
                  isLoggedIn
                    ? <DiveLog />
                    : <Navigate to="/" replace />
                }
              />

              <Route path="*" element={<NotFound />} />

            </Routes>
          </main>
        </div>

        <footer>
          <li>
                <a 
                  className="nav-link" 
                  href="https://github.com/josh10e/startup" 
                  target="_blank"
                >
                  Startup Repository
                </a>
              </li>
        </footer>
      </div>
    </BrowserRouter>
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