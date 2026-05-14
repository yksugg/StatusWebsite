import { Link } from "react-router-dom";

type HeroBannerProps = {
  eyebrow?: string;
  title: string;
  copy: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image?: string;
  align?: "left" | "center";
};

export default function HeroBanner({
  eyebrow,
  title,
  copy,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  image = "/placeholders/hero-status-lighting.svg",
  align = "left",
}: HeroBannerProps) {
  return (
    <section className={`hero-banner hero-${align}`}>
      <img src={image} alt="" className="hero-image" />
      <div className="hero-overlay" />
      <div className="hero-content">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p>{copy}</p>
        {(primaryLabel || secondaryLabel) && (
          <div className="hero-actions">
            {primaryLabel && primaryHref ? (
              <Link className="button primary" to={primaryHref}>
                {primaryLabel}
              </Link>
            ) : null}
            {secondaryLabel && secondaryHref ? (
              <Link className="button secondary" to={secondaryHref}>
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
