import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function Login({ setIsLoggedIn, setUsername }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const endpoint = isRegistering ? "/api/auth/create" : "/api/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "Login failed");
        return;
      }

      setIsLoggedIn(true);
      setUsername(email);

      navigate("/divelog");
    } catch (e) {
      alert("Server error during login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="content">
        <h2>{isRegistering ? "Create Account" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label><br />
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} /><br /><br />

          <label>Password:</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br /><br />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : isRegistering ? "Create Account" : "Login"}
          </button>
        </form>

        <button style={{ marginTop: "10px" }} onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Back to Login" : "Create Account"}
        </button>
      </section>
    </main>
  );
}