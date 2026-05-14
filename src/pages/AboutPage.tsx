import TrustBar from "../components/TrustBar";

const sections = [
  {
    title: "Our Story",
    copy: "Status International UK is presented here as a trusted UK supplier of lighting and electrical accessories with over 30 years of trading. This draft positions the brand for a direct-to-consumer store while retaining the practical confidence customers expect from everyday essentials.",
    image: "/placeholders/about-warehouse.svg",
  },
  {
    title: "Quality & Testing",
    copy: "The page is structured to highlight laboratory checks, quality testing, and product support. Final compliance wording, certifications, and testing imagery should be inserted during the asset and content phase.",
    image: "/placeholders/about-quality.svg",
  },
  {
    title: "Distribution & Availability",
    copy: "Based in West Yorkshire, Status can use this section to explain warehouse and distribution capabilities, future direct fulfilment, and availability across broad product categories.",
    image: "/placeholders/about-distribution.svg",
  },
  {
    title: "Customer Support",
    copy: "The direct store experience gives customers clearer help before and after purchase, including product enquiries, order support, warranty information, and technical guidance.",
    image: "/placeholders/about-team.svg",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero split-hero">
        <div>
          <p className="eyebrow">About Status International UK</p>
          <h1>Trusted lighting and electrical essentials for everyday customers.</h1>
          <p>
            A professional, customer-focused brand story for a UK supplier with over 30 years of
            trading, West Yorkshire roots, and a broad product range ready for direct retail.
          </p>
        </div>
        <img src="/placeholders/about-product-range.svg" alt="" />
      </section>

      <section className="section padded">
        <div className="story-stack">
          {sections.map((section, index) => (
            <article key={section.title} className={index % 2 ? "is-reversed" : ""}>
              <img src={section.image} alt="" />
              <div>
                <p className="eyebrow">Status direct</p>
                <h2>{section.title}</h2>
                <p>{section.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="why-direct">
        <div>
          <p className="eyebrow">Why Buy Direct from Status?</p>
          <h2>Clearer product information, helpful support, and a saved shopping experience.</h2>
        </div>
        <div className="direct-grid">
          <article>
            <strong>Richer product guidance</strong>
            <p>Specifications, compatibility, and use cases can be explained beyond marketplace limits.</p>
          </article>
          <article>
            <strong>Saved baskets and liked items</strong>
            <p>Customers can return to essential household products when they need to restock.</p>
          </article>
          <article>
            <strong>Future direct promotions</strong>
            <p>Campaigns, bundles, and seasonal ranges can be merchandised directly by the brand.</p>
          </article>
        </div>
      </section>

      <TrustBar />
    </>
  );
}
