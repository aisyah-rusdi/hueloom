import Sheet from "./Sheet";
import { readableTextOn } from "../utils/color";

export default function PreviewSection({ hexAtSlot, onRandomizeStyle, onRestoreStyle, toast }) {
  const vars = {};
  for (let i = 0; i < 7; i++) {
    const hex = hexAtSlot(i);
    if (hex) {
      vars[`--s${i + 1}`] = hex;
      vars[`--s${i + 1}-on`] = readableTextOn(hex);
    }
  }

  return (
    <Sheet
      ink="yellow"
      eyebrow="No. 3 — Proof Sheet"
      title="Preview"
      sub="Seven fixed elements, coloured from your palette — cycling through it if you have fewer than seven."
      headingId="preview-heading"
    >
      <div className="list-actions" style={{ marginTop: 0, marginBottom: 14 }}>
        <button type="button" className="btn btn-small" onClick={onRestoreStyle}>
          Restore style
        </button>
        <button type="button" className="btn btn-small btn-yellow" onClick={onRandomizeStyle}>
          Randomize style ⟳
        </button>
      </div>

      <div className="preview-stage" style={vars}>
        <div className="preview-topbar">
          <span className="brand">Acme Studio</span>
          <div className="preview-dots"><span /><span /><span /></div>
        </div>
        <div className="preview-body">
          <nav className="preview-nav" aria-label="Sample navigation (preview only)">
            <div className="preview-nav-item active">Overview</div>
            <div className="preview-nav-item">Projects</div>
            <div className="preview-nav-item">Settings</div>
          </nav>
          <div className="preview-main">
            <h3 className="preview-heading">Weekly summary</h3>
            <p className="preview-subtitle">Three new threads added to your workspace</p>
            <button
              type="button"
              className="preview-cta"
              aria-label="Preview only — not an active control"
              onClick={() => toast("Preview only — this button doesn't navigate")}
            >
              View report
            </button>
          </div>
        </div>
      </div>
      <p className="preview-note">
        Buttons here are for preview only and don't navigate anywhere. "Randomize style" shuffles which colour
        lands in each of the 7 slots; "Restore style" cycles them back through your palette in order.
      </p>
    </Sheet>
  );
}
