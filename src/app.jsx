import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { Home } from './login/login';
import { DivePlanner } from './diveplanner/diveplanner';
import { DiveLog } from './divelog/divelog';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-body">
        <header>
          <h1>Dive Planner</h1>
        </header>

        <nav className="sidebar">
          <h2>Pages</h2>
          <ul>
            <li>
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/diveplanner">Plan a Dive</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/divelog">Log a Dive</NavLink>
            </li>
            <li>
              <a className="nav-link" href="https://github.com/josh10e/startup">Startup Repository</a>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diveplanner" element={<DivePlanner />} />
            <Route path="/divelog" element={<DiveLog />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}s