import { Mail } from "lucide-react";
import { useState } from "react";

export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className={`newsletter ${compact ? "is-compact" : ""}`}>
      <div>
        <p className="eyebrow">Stay in the loop</p>
        <h2>Join the Status mailing list for new launches, offers, and home essentials.</h2>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <label htmlFor={compact ? "footer-newsletter" : "newsletter-email"} className="sr-only">
          Email address
        </label>
        <div className="input-with-icon">
          <Mail size={18} aria-hidden="true" />
          <input
            id={compact ? "footer-newsletter" : "newsletter-email"}
            type="email"
            placeholder="Email address"
            required
          />
        </div>
        <button className="button primary" type="submit">
          Sign Up
        </button>
      </form>
      {submitted ? <p className="form-note">Thanks. This prototype stores no newsletter data.</p> : null}
    </section>
  );
}
