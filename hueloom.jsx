import React, { useState } from 'react';

export default function Hueloom() {
  const [palettes, setPalettes] = useState([
    {
      id: 1,
      name: 'Sunset Dream',
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#95E77E',
        neutral: '#FFBE0B'
      }
    },
    {
      id: 2,
      name: 'Cotton Candy',
      colors: {
        primary: '#C77DFF',
        secondary: '#FF8FA3',
        accent: '#FFE5EC',
        neutral: '#E8B4F3'
      }
    }
  ]);

  const [activePalette, setActivePalette] = useState(palettes[0]);
  const [editingRole, setEditingRole] = useState('primary');
  const [hexInput, setHexInput] = useState(activePalette.colors.primary);

  const generateRandomPalette = () => {
    const generateRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const primary = generateRandomColor();
    const secondary = generateRandomColor();
    const accent = generateRandomColor();
    const neutral = generateRandomColor();

    const newPalette = {
      id: Date.now(),
      name: `Palette ${palettes.length + 1}`,
      colors: { primary, secondary, accent, neutral }
    };

    setPalettes([...palettes, newPalette]);
    setActivePalette(newPalette);
  };

  const updateColor = (role, color) => {
    const updatedPalette = {
      ...activePalette,
      colors: { ...activePalette.colors, [role]: color }
    };
    
    const updatedPalettes = palettes.map(p => 
      p.id === activePalette.id ? updatedPalette : p
    );
    
    setPalettes(updatedPalettes);
    setActivePalette(updatedPalette);
  };

  const handleHexChange = (e) => {
    const value = e.target.value;
    setHexInput(value);
    
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      updateColor(editingRole, value);
    }
  };

  const selectPalette = (palette) => {
    setActivePalette(palette);
    setHexInput(palette.colors.primary);
    setEditingRole('primary');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Hueloom
          </h1>
          <p className="text-gray-600 text-lg">Create beautiful colour palettes with ease</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Palette List</h2>
              <div className="space-y-3">
                {palettes.map((palette) => (
                  <div
                    key={palette.id}
                    onClick={() => selectPalette(palette)}
                    className={`cursor-pointer rounded-xl p-4 transition-all duration-300 hover:shadow-md ${
                      activePalette.id === palette.id ? 'ring-2 ring-purple-400' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-800">{palette.name}</h3>
                      <div className="flex gap-1">
                        {Object.values(palette.colors).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 opacity-0 hover:opacity-100 transition-opacity">
                      Click to edit this palette
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={generateRandomPalette}
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 px-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                🎨 Generate Random Palette
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Palette Editor</h2>
              <div className="space-y-4">
                {Object.entries(activePalette.colors).map(([role, color]) => (
                  <div key={role} className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setEditingRole(role);
                        setHexInput(color);
                      }}
                      className={`flex-1 flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                        editingRole === role ? 'bg-purple-100 ring-2 ring-purple-400' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-lg shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                      <span className="capitalize font-medium text-gray-700">{role}</span>
                    </button>
                    <span className="text-sm text-gray-500 font-mono">{color}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edit {editingRole} colour
                </label>
                <input
                  type="text"
                  value={hexInput}
                  onChange={handleHexChange}
                  placeholder="#000000"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors font-mono"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Preview Panel</h2>
              
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden shadow-sm">
                  <div
                    className="h-32 flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: activePalette.colors.primary }}
                  >
                    Primary Header
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="rounded-xl p-6 text-white font-medium"
                    style={{ backgroundColor: activePalette.colors.secondary }}
                  >
                    Secondary Block
                  </div>
                  <div
                    className="rounded-xl p-6 text-white font-medium"
                    style={{ backgroundColor: activePalette.colors.accent }}
                  >
                    Accent Block
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Sample Components</h3>
                  <div className="space-y-4">
                    <button
                      className="px-6 py-2 rounded-full text-white font-medium transition-all duration-200 hover:opacity-90"
                      style={{ backgroundColor: activePalette.colors.primary }}
                    >
                      Primary Button
                    </button>
                    <button
                      className="px-6 py-2 rounded-full text-white font-medium transition-all duration-200 hover:opacity-90"
                      style={{ backgroundColor: activePalette.colors.secondary }}
                    >
                      Secondary Button
                    </button>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full"
                        style={{ backgroundColor: activePalette.colors.accent }}
                      />
                      <div
                        className="w-12 h-12 rounded-full"
                        style={{ backgroundColor: activePalette.colors.neutral }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Colour Swatches</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {Object.entries(activePalette.colors).map(([role, color]) => (
                      <div key={role} className="text-center">
                        <div
                          className="w-full h-20 rounded-lg shadow-sm mb-2"
                          style={{ backgroundColor: color }}
                        />
                        <p className="text-xs font-medium text-gray-600 capitalize">{role}</p>
                        <p className="text-xs text-gray-500 font-mono">{color}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}