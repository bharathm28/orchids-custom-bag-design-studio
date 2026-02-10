"use client";

import { useCallback, useRef } from "react";
import { BagConfig } from "./bag-configs";

const presetColors = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#14b8a6",
  "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e",
  "#1e293b", "#334155", "#475569", "#64748b", "#94a3b8",
  "#ffffff", "#f5f5f4", "#d4d4d8", "#0f172a", "#000000",
  "#78350f", "#92400e", "#854d0e", "#365314", "#164e63",
];

const strapDesigns = ["Solid", "Striped", "Camo", "Reflective", "Padded Extra", "Mesh"];

interface CustomizationPanelProps {
  config: BagConfig;
  selectedPart: string | null;
  partColors: Record<string, string>;
  partTextures: Record<string, string>;
  foamType: string;
  strapDesign: string;
  onSelectPart: (partId: string) => void;
  onColorChange: (partId: string, color: string) => void;
  onTextureUpload: (partId: string, dataUrl: string) => void;
  onTextureRemove: (partId: string) => void;
  onFoamChange: (foam: string) => void;
  onStrapDesignChange: (design: string) => void;
  onReset: () => void;
}

export default function CustomizationPanel({
  config,
  selectedPart,
  partColors,
  partTextures,
  foamType,
  strapDesign,
  onSelectPart,
  onColorChange,
  onTextureUpload,
  onTextureRemove,
  onFoamChange,
  onStrapDesignChange,
  onReset,
}: CustomizationPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!selectedPart || !e.target.files?.[0]) return;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          onTextureUpload(selectedPart, ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    },
    [selectedPart, onTextureUpload]
  );

  const selectedPartConfig = config.parts.find((p) => p.id === selectedPart);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <h2 className="font-bold text-lg">{config.name} Customizer</h2>
        <button
          onClick={onReset}
          className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        >
          Reset All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Parts List */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">Bag Parts</h3>
          <div className="grid grid-cols-2 gap-2">
            {config.parts.map((part) => (
              <button
                key={part.id}
                onClick={() => onSelectPart(part.id)}
                className={`text-left p-3 rounded-xl text-sm transition-all cursor-pointer ${
                  selectedPart === part.id
                    ? "bg-indigo-500/20 border border-indigo-400/40 text-white"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                    style={{ background: partColors[part.id] || part.defaultColor }}
                  />
                  <span className="truncate">{part.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Part Customization */}
        {selectedPartConfig && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg border-2 border-white/20"
                style={{ background: partColors[selectedPartConfig.id] || selectedPartConfig.defaultColor }}
              />
              <div>
                <h3 className="font-semibold">{selectedPartConfig.name}</h3>
                <p className="text-xs text-white/40">{selectedPartConfig.description}</p>
              </div>
            </div>

            {/* Color Picker */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white/40 uppercase tracking-wider block mb-2">Color</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => onColorChange(selectedPartConfig.id, color)}
                    className={`w-7 h-7 rounded-lg border-2 transition-all cursor-pointer hover:scale-110 ${
                      (partColors[selectedPartConfig.id] || selectedPartConfig.defaultColor) === color
                        ? "border-white scale-110"
                        : "border-white/20"
                    }`}
                    style={{ background: color }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-white/50">Custom:</label>
                <input
                  type="color"
                  value={partColors[selectedPartConfig.id] || selectedPartConfig.defaultColor}
                  onChange={(e) => onColorChange(selectedPartConfig.id, e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs text-white/40 font-mono">
                  {partColors[selectedPartConfig.id] || selectedPartConfig.defaultColor}
                </span>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white/40 uppercase tracking-wider block mb-2">
                Custom Image / Texture
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors cursor-pointer border border-white/10"
                >
                  Upload Image
                </button>
                {partTextures[selectedPartConfig.id] && (
                  <button
                    onClick={() => onTextureRemove(selectedPartConfig.id)}
                    className="px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm font-medium transition-colors cursor-pointer border border-red-500/20"
                  >
                    Remove
                  </button>
                )}
              </div>
              {partTextures[selectedPartConfig.id] && (
                <div className="mt-2 p-2 rounded-lg bg-white/5 border border-white/10">
                  <img
                    src={partTextures[selectedPartConfig.id]}
                    alt="Uploaded texture"
                    className="w-full h-20 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Foam Type */}
        <div className="p-4 border-t border-white/10">
          <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">Foam / Padding Type</h3>
          <div className="flex flex-wrap gap-2">
            {config.foamTypes.map((foam) => (
              <button
                key={foam}
                onClick={() => onFoamChange(foam)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  foamType === foam
                    ? "bg-indigo-500 text-white"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                {foam}
              </button>
            ))}
          </div>
        </div>

        {/* Strap Design */}
        <div className="p-4 border-t border-white/10">
          <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">Strap Design</h3>
          <div className="flex flex-wrap gap-2">
            {strapDesigns.map((design) => (
              <button
                key={design}
                onClick={() => onStrapDesignChange(design)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  strapDesign === design
                    ? "bg-indigo-500 text-white"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                {design}
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-4 border-t border-white/10">
          <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Base bag ({config.name})</span>
              <span>$59.00</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Custom colors ({Object.keys(partColors).length} parts)</span>
              <span>${Object.keys(partColors).length * 3}.00</span>
            </div>
            {Object.keys(partTextures).length > 0 && (
              <div className="flex justify-between text-white/60">
                <span>Image prints ({Object.keys(partTextures).length})</span>
                <span>${Object.keys(partTextures).length * 8}.00</span>
              </div>
            )}
            <div className="flex justify-between text-white/60">
              <span>{foamType} foam</span>
              <span>{foamType === "Standard" ? "Free" : "+$12.00"}</span>
            </div>
            <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-white">
              <span>Total</span>
              <span>
                $
                {59 +
                  Object.keys(partColors).length * 3 +
                  Object.keys(partTextures).length * 8 +
                  (foamType === "Standard" ? 0 : 12)}
                .00
              </span>
            </div>
          </div>
          <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 font-semibold transition-all cursor-pointer">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
