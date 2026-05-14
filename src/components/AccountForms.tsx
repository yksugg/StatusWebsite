import { Lock, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { useStore } from "../context/StoreContext";

export default function AccountForms() {
  const { login } = useStore();
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

  return (
    <div className="account-form-grid">
      <section className="account-panel">
        <p className="eyebrow">Create Account</p>
        <h2>Save baskets, liked items, and recently viewed products.</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // Backend integration point: replace this local mock with real auth and customer APIs.
            login({ name: signupName || "Status Customer", email: signupEmail });
          }}
        >
          <label>
            <span>Name</span>
            <div className="input-with-icon">
              <UserRound size={18} aria-hidden="true" />
              <input value={signupName} onChange={(event) => setSignupName(event.target.value)} required />
            </div>
          </label>
          <label>
            <span>Email</span>
            <div className="input-with-icon">
              <Mail size={18} aria-hidden="true" />
              <input
                type="email"
                value={signupEmail}
                onChange={(event) => setSignupEmail(event.target.value)}
                required
              />
            </div>
          </label>
          <label>
            <span>Password</span>
            <div className="input-with-icon">
              <Lock size={18} aria-hidden="true" />
              <input type="password" minLength={8} required />
            </div>
          </label>
          <label className="check-row">
            <input type="checkbox" />
            <span>Send me new launches, offers, and practical home essentials updates.</span>
          </label>
          <button className="button primary wide" type="submit">
            Create Account
          </button>
        </form>
      </section>

      <section className="account-panel">
        <p className="eyebrow">Login</p>
        <h2>Return to your saved basket and recommendations.</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // Backend integration point: validate credentials server-side before setting customer state.
            login({ name: "Returning Customer", email: loginEmail });
          }}
        >
          <label>
            <span>Email</span>
            <div className="input-with-icon">
              <Mail size={18} aria-hidden="true" />
              <input
                type="email"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                required
              />
            </div>
          </label>
          <label>
            <span>Password</span>
            <div className="input-with-icon">
              <Lock size={18} aria-hidden="true" />
              <input type="password" required />
            </div>
          </label>
          <label className="check-row">
            <input type="checkbox" />
            <span>Remember me on this device.</span>
          </label>
          <button className="button dark wide" type="submit">
            Login
          </button>
        </form>
      </section>
    </div>
  );
}
