import { BadgeCheck, Headphones, PackageCheck, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: BadgeCheck,
    title: "UK-based supplier",
    copy: "West Yorkshire team and distribution base.",
  },
  {
    icon: ShieldCheck,
    title: "Quality tested products",
    copy: "Laboratory and compliance messaging placeholder.",
  },
  {
    icon: PackageCheck,
    title: "Fast dispatch placeholder",
    copy: "Ready for fulfilment and delivery integration.",
  },
  {
    icon: Headphones,
    title: "Helpful customer support",
    copy: "Clear product support and account assistance.",
  },
];

export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Why shop with Status">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article key={item.title}>
            <Icon size={24} aria-hidden="true" />
            <div>
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
