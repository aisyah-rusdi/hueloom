export default function RegistrationMark({ position }) {
  return (
    <svg
      className={`regmark ${position}`}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" fill="none" stroke="var(--ink)" strokeWidth="1.4" />
      <line x1="10" y1="1" x2="10" y2="19" stroke="var(--ink)" strokeWidth="1.4" />
      <line x1="1" y1="10" x2="19" y2="10" stroke="var(--ink)" strokeWidth="1.4" />
    </svg>
  );
}
