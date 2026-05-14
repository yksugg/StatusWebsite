import { HelpCircle, Mail, MapPin, MessageSquare, Phone, Wrench } from "lucide-react";

const cards = [
  { icon: Phone, title: "Customer support", copy: "Order, account, delivery, and returns help." },
  { icon: MessageSquare, title: "Product enquiries", copy: "Questions about product fit, use, or availability." },
  { icon: Wrench, title: "Technical support", copy: "Guidance for specifications and product setup." },
  { icon: HelpCircle, title: "Trade / wholesale enquiry", copy: "Placeholder route for business enquiries." },
];

const faqs = [
  ["Delivery", "Delivery pricing, thresholds, and service levels will connect to fulfilment rules later."],
  ["Returns", "Returns windows and instructions are placeholders for the final customer service policy."],
  ["Product support", "Product guides, compatibility information, and technical support can be linked by SKU."],
  ["Warranty", "Warranty terms should be added once final product and category policies are confirmed."],
  ["Account help", "Account management will connect to real authentication and customer APIs."],
];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero compact-hero">
        <div>
          <p className="eyebrow">Contact Status</p>
          <h1>Support for orders, products, and practical home essentials.</h1>
          <p>Use this draft page to demonstrate customer service routing before the real CRM and support tools are connected.</p>
        </div>
      </section>

      <section className="contact-layout">
        <form className="contact-form">
          <h2>Send us a message</h2>
          <label>
            <span>Name</span>
            <input required />
          </label>
          <label>
            <span>Email</span>
            <input type="email" required />
          </label>
          <label>
            <span>Order number optional</span>
            <input />
          </label>
          <label>
            <span>Enquiry type</span>
            <select defaultValue="Product enquiry">
              <option>Product enquiry</option>
              <option>Order support</option>
              <option>Returns</option>
              <option>Technical support</option>
              <option>Trade / wholesale enquiry</option>
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea rows={6} required />
          </label>
          <button type="submit" className="button primary">
            Submit Enquiry
          </button>
          <p className="form-note">This is a prototype form. Backend ticketing and email delivery connect later.</p>
        </form>

        <div className="contact-side">
          <div className="contact-card-grid">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title}>
                  <Icon size={24} aria-hidden="true" />
                  <h2>{card.title}</h2>
                  <p>{card.copy}</p>
                </article>
              );
            })}
          </div>
          <div className="map-placeholder">
            <MapPin size={28} aria-hidden="true" />
            <div>
              <strong>West Yorkshire address placeholder</strong>
              <p>Map embed and confirmed contact address to be added with final business details.</p>
            </div>
          </div>
          <div className="email-strip">
            <Mail size={20} aria-hidden="true" />
            <span>support@example.com placeholder</span>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2>Common customer questions</h2>
          </div>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
