// ---------------- core colour math ----------------

const clamp255 = (n) => Math.max(0, Math.min(255, n));

export function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) => clamp255(Math.round(x * 255)).toString(16).padStart(2, "0");
  return "#" + toHex(f(0)) + toHex(f(8)) + toHex(f(4));
}

export function hexToHSL(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

const HEX_RE = /^#?([0-9A-Fa-f]{6})$/;
export function normalizeHex(input) {
  if (!input) return null;
  const m = input.trim().match(HEX_RE);
  if (!m) return null;
  return "#" + m[1].toUpperCase();
}

export function relLuminance(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function readableTextOn(hex) {
  return relLuminance(hex) > 0.42 ? "#1a1a1a" : "#f5f2ea";
}

// ---------------- naming & generation ----------------

const NAME_BUCKETS = [
  [15, "Ember"], [35, "Amber"], [55, "Gold"], [80, "Olive"], [140, "Moss"],
  [170, "Jade"], [195, "Teal"], [215, "Sky"], [245, "Indigo"], [275, "Violet"],
  [300, "Orchid"], [325, "Magenta"], [345, "Rose"], [360, "Ember"]
];

export function nameForColor(hex) {
  const { h, s, l } = hexToHSL(hex);
  if (s < 12) {
    if (l < 20) return "Charcoal";
    if (l < 40) return "Slate";
    if (l < 60) return "Stone";
    if (l < 82) return "Mist";
    return "Snow";
  }
  for (const [max, label] of NAME_BUCKETS) {
    if (h <= max) return label;
  }
  return "Hue";
}

export function randomSwatchHex() {
  const h = Math.floor(Math.random() * 360);
  const s = 45 + Math.random() * 25;
  const l = 40 + Math.random() * 16;
  return hslToHex(h, s, l);
}

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
