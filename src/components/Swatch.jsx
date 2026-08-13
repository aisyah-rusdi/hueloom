import { nameForColor } from "../utils/color";

export default function Swatch({ hex, onRemove, canRemove }) {
  const name = nameForColor(hex);
  return (
    <div
      className="swatch"
      style={{ background: hex }}
      tabIndex={0}
      role="group"
      aria-label={`${name}, ${hex}`}
    >
      <button
        type="button"
        className="swatch-del"
        onClick={onRemove}
        disabled={!canRemove}
        aria-label={`Remove ${name}, ${hex}`}
        title={canRemove ? "Remove" : "Keep at least two colors"}
      >
        ×
      </button>
      <div className="swatch-overlay">
        <div className="o-name" style={{ color: hex }}>{name}</div>
        <div className="o-hex">{hex}</div>
      </div>
    </div>
  );
}
