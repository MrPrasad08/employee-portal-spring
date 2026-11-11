import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    // Demo login only. Add Spring Security for real authentication.
    if (email === "admin@employee.com" && password === "Admin@123") {
      setError("");
      onLogin();
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-decoration">
        <div className="login-brand">
          <span className="brand-mark">EP</span>
          <span>Employee Portal</span>
        </div>
        <div className="login-message">
          <span className="eyebrow">PEOPLE • PERFORMANCE • PROGRESS</span>
          <h1>Great teams start with great people.</h1>
          <p>A simple workspace to organise your employees and keep your team moving forward.</p>
          <div className="login-feature">
            <span>✓</span> Employee records in one place
          </div>
          <div className="login-feature">
            <span>✓</span> Quick updates and clear insights
          </div>
        </div>
        <p className="login-decoration-footer">Employee Management System</p>
      </div>

      <div className="login-form-side">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-mobile-brand">
            <span className="brand-mark">EP</span>
            <strong>Employee Portal</strong>
          </div>
          <span className="eyebrow">WELCOME BACK</span>
          <h2>Sign in to your account</h2>
          <p className="muted">Enter your details to continue to the dashboard.</p>

          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            placeholder="admin@employee.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="login-password">Password</label>
          <div className="password-field">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && <div className="form-error">{error}</div>}
          <button className="button button-primary login-submit" type="submit">Sign in <span>→</span></button>

          <div className="demo-credentials">
            <strong>Demo credentials</strong>
            <span>Email: admin@employee.com</span>
            <span>Password: Admin@123</span>
          </div>
          <p className="login-note">Demo-only login. This is not production authentication.</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
