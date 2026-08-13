import Sheet from "./Sheet";
import Swatch from "./Swatch";
import { MIN_COLORS, MAX_COLORS } from "../hooks/usePalette";

export default function PaletteSection({ palette, onRemove, onAdd, onRandomize }) {
  const canRemove = palette.length > MIN_COLORS;
  const canAdd = palette.length < MAX_COLORS;

  return (
    <Sheet
      ink="coral"
      eyebrow="No. 1 — Mixing Room"
      title="Palette"
      sub="Hover a square to see its name and hex. More colours, thinner squares."
      headingId="palette-heading"
    >
      <div className="swatch-row">
        {palette.map((sw) => (
          <Swatch
            key={sw.id}
            hex={sw.hex}
            canRemove={canRemove}
            onRemove={() => onRemove(sw.id)}
          />
        ))}
      </div>

      <div className="list-actions">
        <button type="button" className="btn btn-small" onClick={onAdd} disabled={!canAdd}>
          + Add colour
        </button>
        <button type="button" className="btn btn-small btn-coral" onClick={onRandomize}>
          Randomize ⟳
        </button>
      </div>
      <p className="list-note">
        {canAdd ? `${palette.length} of ${MAX_COLORS} colors used.` : `Palette is full — ${MAX_COLORS} colors max.`}
      </p>
    </Sheet>
  );
}
