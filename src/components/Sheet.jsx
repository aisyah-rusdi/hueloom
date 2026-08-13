import RegistrationMark from "./RegistrationMark";

const INK_VARS = {
  coral: "var(--riso-coral)",
  teal: "var(--riso-teal)",
  yellow: "var(--riso-yellow)"
};

export default function Sheet({ ink = "coral", eyebrow, title, sub, headingId, children }) {
  return (
    <section className={`sheet sheet--${ink}`} aria-labelledby={headingId}>
      <RegistrationMark position="tl" />
      <RegistrationMark position="br" />
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        id={headingId}
        className="riso-heading"
        data-text={title}
        style={{ "--offset-ink": INK_VARS[ink] }}
      >
        {title}
      </h2>
      {sub && <p className="sub">{sub}</p>}
      {children}
    </section>
  );
}
