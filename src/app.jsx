const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { Login } from './login/login';
import { DivePlanner } from './diveplanner/diveplanner';
import { DiveLog } from './divelog/divelog';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <BrowserRouter>
      <div className="app-body">
        <header>
            <h1 className="header">Dive Planner</h1>
        </header>

        <div className="main-container">
          <nav className="sidebar">
            <h2>Pages</h2>
            <ul>
              <li><NavLink className="nav-link" to="/">Login</NavLink></li>
              <li><NavLink className="nav-link" to="/diveplanner">Plan a Dive</NavLink></li>
              {isLoggedIn && (<li><NavLink className="nav-link" to="/divelog">Log a Dive</NavLink></li>)}
              <li><a className="nav-link" href="https://github.com/josh10e/startup" target="_blank">Startup Repository</a></li>
            </ul>
          </nav>

          <main className="content">
            <Routes>
              <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/diveplanner" element={<DivePlanner />} />
              <Route 
                path="/divelog" 
                element={isLoggedIn ? <DiveLog /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>

        <footer>
          Dive Planner
        </footer>
      </div>
    </BrowserRouter>
  );
}

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Login />;
}

function NotFound() {
  return (
    <section className="content">
      <h2>404: Page not found</h2>
      <p>Return to sender. Address unknown.</p>
    </section>
  );
}