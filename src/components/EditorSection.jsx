import { useEffect, useRef, useState } from "react";
import Sheet from "./Sheet";
import { normalizeHex } from "../utils/color";

export default function EditorSection({ palette, onUpdate, toast }) {
  const [selectedId, setSelectedId] = useState(palette[0]?.id ?? "");
  const [inputValue, setInputValue] = useState(palette[0]?.hex ?? "");
  const [originalHex, setOriginalHex] = useState(palette[0]?.hex ?? "");
  const debounceRef = useRef(null);

  // Keep the selection valid as the palette changes (add / remove / randomize).
  useEffect(() => {
    const stillExists = palette.some((s) => s.id === selectedId);
    const target = stillExists ? palette.find((s) => s.id === selectedId) : palette[0];
    if (target) {
      if (!stillExists) setSelectedId(target.id);
      setOriginalHex(target.hex);
      setInputValue(target.hex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palette]);

  const resolved = normalizeHex(inputValue);
  const isEmpty = !inputValue.trim();

  function handleSelectChange(e) {
    const id = e.target.value;
    const sw = palette.find((s) => s.id === id);
    if (!sw) return;
    setSelectedId(id);
    setOriginalHex(sw.hex);
    setInputValue(sw.hex);
  }

  function handleTextChange(e) {
    const val = e.target.value;
    setInputValue(val);
  }

  function handlePickerChange(e) {
    setInputValue(e.target.value.toUpperCase());
  }

  function handleSubmit() {
    if (!resolved) return;
    const ok = onUpdate(selectedId, resolved);
    if (ok) toast("Colour updated");
  }

  return (
    <Sheet
      ink="teal"
      eyebrow="No. 2 — Colour Bench"
      title="Editor"
      sub="Pick a colour, then change its hex — type it or click the box to pick one."
      headingId="editor-heading"
    >
      <div className="editor-grid">
        <div className="field">
          <label htmlFor="colour-select">Colour</label>
          <select id="colour-select" value={selectedId} onChange={handleSelectChange}>
            {palette.map((sw) => (
              <option key={sw.id} value={sw.id}>{sw.hex}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="color-input">Hex</label>
          <div className="input-with-preview">
            <div className="swatch-preview-wrap">
              <div
                className="swatch-preview"
                style={{
                  background: resolved || "transparent",
                  borderStyle: resolved ? "solid" : "dashed"
                }}
                aria-hidden="true"
              />
              <input
                type="color"
                aria-label="Pick a color"
                value={resolved || "#B9862A"}
                onChange={handlePickerChange}
              />
            </div>
            <input
              type="text"
              id="color-input"
              placeholder="#B9862A"
              autoComplete="off"
              maxLength={7}
              value={inputValue}
              onChange={handleTextChange}
            />
          </div>
        </div>

        <div className="editor-buttons">
          <button type="button" className="btn btn-teal" onClick={handleSubmit} disabled={!resolved}>
            Edit palette
          </button>
        </div>
      </div>

      <p className={`editor-status ${!isEmpty && !resolved ? "err" : ""}`} role="status" aria-live="polite">
        {isEmpty ? "" : resolved ? (
          <>
            <span className="old">{originalHex}</span>
            <span className="sep"> | </span>
            <span className="new">{resolved}</span>
          </>
        ) : (
          "⚠ Enter a 6-digit hex code, e.g. #B9862A"
        )}
      </p>
    </Sheet>
  );
}
