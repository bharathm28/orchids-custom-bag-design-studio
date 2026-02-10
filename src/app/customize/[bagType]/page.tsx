"use client";

import { useState, useCallback, Suspense, use } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, PresentationControls } from "@react-three/drei";
import { bagConfigs } from "@/components/bag-customizer/bag-configs";
import CustomizationPanel from "@/components/bag-customizer/CustomizationPanel";

const BagModel3D = dynamic(() => import("@/components/bag-customizer/BagModel3D"), { ssr: false });

export default function CustomizePage({ params }: { params: Promise<{ bagType: string }> }) {
  const { bagType } = use(params);
  const config = bagConfigs[bagType];

  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [partColors, setPartColors] = useState<Record<string, string>>({});
  const [partTextures, setPartTextures] = useState<Record<string, string>>({});
  const [foamType, setFoamType] = useState("Standard");
  const [strapDesign, setStrapDesign] = useState("Solid");

  const handleColorChange = useCallback((partId: string, color: string) => {
    setPartColors((prev) => ({ ...prev, [partId]: color }));
  }, []);

  const handleTextureUpload = useCallback((partId: string, dataUrl: string) => {
    setPartTextures((prev) => ({ ...prev, [partId]: dataUrl }));
  }, []);

  const handleTextureRemove = useCallback((partId: string) => {
    setPartTextures((prev) => {
      const next = { ...prev };
      delete next[partId];
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setPartColors({});
    setPartTextures({});
    setFoamType("Standard");
    setStrapDesign("Solid");
    setSelectedPart(null);
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Bag type not found</h1>
          <Link href="/" className="text-indigo-400 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 z-50 shrink-0">
        <div className="max-w-full mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                B
              </div>
              <span className="text-lg font-bold tracking-tight hidden sm:inline">BagForge</span>
            </Link>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white">{config.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/40">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live Preview
            </div>
            <span className="text-xs text-white/30">Click parts on the 3D model or panel to customize</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* 3D Viewer */}
        <div className="flex-1 relative">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <directionalLight position={[-3, 3, -3]} intensity={0.3} />
            <pointLight position={[0, -2, 3]} intensity={0.5} color="#a78bfa" />

            <Suspense fallback={null}>
              <PresentationControls
                global
                snap
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
              >
                <BagModel3D
                  bagType={bagType}
                  partColors={partColors}
                  partTextures={partTextures}
                  selectedPart={selectedPart}
                  onPartClick={setSelectedPart}
                />
              </PresentationControls>
              <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.4} />
              <Environment preset="studio" />
            </Suspense>

            <OrbitControls
              enablePan={false}
              minDistance={3}
              maxDistance={8}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>

          {/* Floating info */}
          {selectedPart && (
            <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-sm">
              Editing: <span className="font-semibold text-indigo-300">{config.parts.find((p) => p.id === selectedPart)?.name}</span>
            </div>
          )}

          {/* View controls hint */}
          <div className="absolute bottom-4 right-4 text-xs text-white/30 flex flex-col items-end gap-1">
            <span>Drag to rotate</span>
            <span>Scroll to zoom</span>
            <span>Click part to select</span>
          </div>
        </div>

        {/* Customization Panel */}
        <div className="w-[380px] border-l border-white/10 bg-gray-900/80 backdrop-blur-md shrink-0">
          <CustomizationPanel
            config={config}
            selectedPart={selectedPart}
            partColors={partColors}
            partTextures={partTextures}
            foamType={foamType}
            strapDesign={strapDesign}
            onSelectPart={setSelectedPart}
            onColorChange={handleColorChange}
            onTextureUpload={handleTextureUpload}
            onTextureRemove={handleTextureRemove}
            onFoamChange={setFoamType}
            onStrapDesignChange={setStrapDesign}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
