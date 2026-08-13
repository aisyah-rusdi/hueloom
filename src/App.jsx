import { useCallback, useRef, useState } from "react";
import usePalette from "./hooks/usePalette";
import PaletteSection from "./components/PaletteSection";
import EditorSection from "./components/EditorSection";
import PreviewSection from "./components/PreviewSection";
import Toast from "./components/Toast";

export default function App() {
  const {
    palette,
    addColour,
    removeColour,
    updateColour,
    randomizePalette,
    resetPalette,
    randomizeStyle,
    restoreStyle,
    hexAtSlot
  } = usePalette();

  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const toastTimer = useRef(null);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    setToastShow(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShow(false), 2200);
  }, []);

  function handleRandomizePalette() {
    const scheme = randomizePalette();
    toast(`New ${scheme} palette woven — ${palette.length} colors`);
  }

  function handleReset() {
    resetPalette();
    toast("Reset to 3 default colours");
  }

  return (
    <div className="app">
      <div className="blob blob-coral" aria-hidden="true" />
      <div className="blob blob-teal" aria-hidden="true" />
      <div className="blob blob-yellow" aria-hidden="true" />

      <div className="topbar">
        <div className="wordmark">
          <p className="name">Hu<em>e</em>loom</p>
          <p className="tagline">weave a palette, thread by thread</p>
        </div>
        <div className="top-actions">
          <button type="button" className="btn btn-ink" onClick={handleReset}>Reset</button>
        </div>
      </div>

      <main>
        <PaletteSection
          palette={palette}
          onRemove={removeColour}
          onAdd={() => { addColour(); toast("Colour added"); }}
          onRandomize={handleRandomizePalette}
        />

        <EditorSection palette={palette} onUpdate={updateColour} toast={toast} />

        <PreviewSection
          hexAtSlot={hexAtSlot}
          onRandomizeStyle={() => { randomizeStyle(); toast("Preview style shuffled across the 7 elements"); }}
          onRestoreStyle={() => { restoreStyle(); toast("Preview style restored to palette order"); }}
          toast={toast}
        />
      </main>

      <footer className="appfoot">Runs entirely in your browser · nothing here is uploaded or tracked</footer>

      <Toast message={toastMsg} show={toastShow} />
    </div>
  );
}
