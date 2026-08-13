import { useEffect, useState, useCallback } from "react";
import { hslToHex, normalizeHex, randomSwatchHex, uid, shuffle } from "../utils/color";

const STORAGE_KEY = "hueloom.palette.v1";
export const MIN_COLORS = 2;
export const MAX_COLORS = 7;
export const SLOT_COUNT = 7; // the preview always shows exactly 7 coloured elements

const DEFAULT_PALETTE = [
  { id: uid(), hex: "#B9862A" },
  { id: uid(), hex: "#3F7B73" },
  { id: uid(), hex: "#A24B5A" }
];

function loadInitial() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length) return parsed;
  } catch (e) {
    /* ignore corrupt storage */
  }
  return DEFAULT_PALETTE.map((s) => ({ ...s }));
}

function identityStyleMap(len) {
  if (len === 0) return Array(SLOT_COUNT).fill(0);
  return Array.from({ length: SLOT_COUNT }, (_, i) => i % len);
}

export default function usePalette() {
  const [palette, setPalette] = useState(loadInitial);
  const [styleMap, setStyleMap] = useState(() => identityStyleMap(loadInitial().length));

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(palette));
    } catch (e) {
      /* storage unavailable — palette still works for this session */
    }
  }, [palette]);

  const addColour = useCallback(() => {
    setPalette((prev) => {
      if (prev.length >= MAX_COLORS) return prev;
      const next = [...prev, { id: uid(), hex: randomSwatchHex() }];
      setStyleMap(identityStyleMap(next.length));
      return next;
    });
  }, []);

  const removeColour = useCallback((id) => {
    setPalette((prev) => {
      if (prev.length <= MIN_COLORS) return prev;
      const next = prev.filter((s) => s.id !== id);
      setStyleMap(identityStyleMap(next.length));
      return next;
    });
  }, []);

  const updateColour = useCallback((id, hex) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return false;
    setPalette((prev) => prev.map((s) => (s.id === id ? { ...s, hex: normalized } : s)));
    return true;
  }, []);

  const randomizePalette = useCallback(() => {
    const baseHue = Math.floor(Math.random() * 360);
    const schemes = ["analogous", "complementary", "triadic"];
    const scheme = schemes[Math.floor(Math.random() * schemes.length)];
    let hues;
    if (scheme === "analogous") hues = [baseHue, baseHue + 28, baseHue - 28, baseHue + 50, baseHue - 50, baseHue + 70, baseHue - 70];
    else if (scheme === "complementary") hues = [baseHue, baseHue + 180, baseHue + 150, baseHue + 210, baseHue + 165, baseHue + 195, baseHue + 30];
    else hues = [baseHue, baseHue + 120, baseHue + 240, baseHue + 60, baseHue + 180, baseHue + 300, baseHue + 90];

    setPalette((prev) => {
      const next = prev.map((sw, i) => {
        const h = ((hues[i % hues.length]) + 360) % 360;
        const s = 45 + Math.random() * 25;
        const l = 38 + Math.random() * 16;
        return { ...sw, hex: hslToHex(h, s, l) };
      });
      setStyleMap(identityStyleMap(next.length));
      return next;
    });
    return scheme;
  }, []);

  const resetPalette = useCallback(() => {
    const fresh = DEFAULT_PALETTE.map((s) => ({ ...s, id: uid() }));
    setPalette(fresh);
    setStyleMap(identityStyleMap(fresh.length));
  }, []);

  const randomizeStyle = useCallback(() => {
    setPalette((prev) => {
      if (prev.length > 0) {
        setStyleMap(Array.from({ length: SLOT_COUNT }, () => Math.floor(Math.random() * prev.length)));
      }
      return prev;
    });
  }, []);

  const restoreStyle = useCallback(() => {
    setPalette((prev) => {
      setStyleMap(identityStyleMap(prev.length));
      return prev;
    });
  }, []);

  const hexAtSlot = useCallback(
    (i) => {
      const idx = styleMap[i];
      return palette[idx] ? palette[idx].hex : null;
    },
    [styleMap, palette]
  );

  return {
    palette,
    styleMap,
    addColour,
    removeColour,
    updateColour,
    randomizePalette,
    resetPalette,
    randomizeStyle,
    restoreStyle,
    hexAtSlot
  };
}
