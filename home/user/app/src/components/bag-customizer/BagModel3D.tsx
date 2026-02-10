"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BagModelProps {
  bagType: string;
  partColors: Record<string, string>;
  partTextures: Record<string, string>;
  selectedPart: string | null;
  onPartClick: (partId: string) => void;
}

function PartMesh({
  geometry,
  color,
  textureUrl,
  partId,
  isSelected,
  onClick,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  geometry: THREE.BufferGeometry;
  color: string;
  textureUrl?: string;
  partId: string;
  isSelected: boolean;
  onClick: (id: string) => void;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => {
    if (!textureUrl) return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load(textureUrl);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [textureUrl]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onClick(partId);
      }}
    >
      <meshStandardMaterial
        color={color}
        map={texture}
        roughness={0.6}
        metalness={0.1}
        emissive={isSelected ? color : "#000000"}
        emissiveIntensity={isSelected ? 0.15 : 0}
      />
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[geometry]} />
          <lineBasicMaterial color="#ffffff" linewidth={2} />
        </lineSegments>
      )}
    </mesh>
  );
}

export default function BagModel3D({ bagType, partColors, partTextures, selectedPart, onPartClick }: BagModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  const getColor = (partId: string, fallback: string) => partColors[partId] || fallback;
  const getTexture = (partId: string) => partTextures[partId] || undefined;

  const geometries = useMemo(() => {
    return {
      // Shared primitives
      box: (w: number, h: number, d: number, r = 0.02) => new THREE.BoxGeometry(w, h, d, 4, 4, 4),
      cylinder: (rt: number, rb: number, h: number, seg = 32) => new THREE.CylinderGeometry(rt, rb, h, seg),
      capsule: (r: number, l: number) => new THREE.CapsuleGeometry(r, l, 8, 16),
      sphere: (r: number) => new THREE.SphereGeometry(r, 32, 32),
      torus: (r: number, t: number) => new THREE.TorusGeometry(r, t, 8, 32),
    };
  }, []);

  const renderBag = () => {
    switch (bagType) {
      case "backpack":
        return <BackpackModel g={geometries} getColor={getColor} getTexture={getTexture} selectedPart={selectedPart} onPartClick={onPartClick} />;
      case "college":
        return <CollegeBagModel g={geometries} getColor={getColor} getTexture={getTexture} selectedPart={selectedPart} onPartClick={onPartClick} />;
      case "duffel":
        return <DuffelBagModel g={geometries} getColor={getColor} getTexture={getTexture} selectedPart={selectedPart} onPartClick={onPartClick} />;
      case "messenger":
        return <MessengerBagModel g={geometries} getColor={getColor} getTexture={getTexture} selectedPart={selectedPart} onPartClick={onPartClick} />;
      case "tote":
        return <ToteBagModel g={geometries} getColor={getColor} getTexture={getTexture} selectedPart={selectedPart} onPartClick={onPartClick} />;
      case "laptop":
        return <LaptopBagModel g={geometries} getColor={getColor} getTexture={getTexture} selectedPart={selectedPart} onPartClick={onPartClick} />;
      default:
        return <BackpackModel g={geometries} getColor={getColor} getTexture={getTexture} selectedPart={selectedPart} onPartClick={onPartClick} />;
    }
  };

  return (
    <group ref={groupRef}>
      {renderBag()}
    </group>
  );
}

type ModelProps = {
  g: {
    box: (w: number, h: number, d: number) => THREE.BoxGeometry;
    cylinder: (rt: number, rb: number, h: number, seg?: number) => THREE.CylinderGeometry;
    capsule: (r: number, l: number) => THREE.CapsuleGeometry;
    sphere: (r: number) => THREE.SphereGeometry;
    torus: (r: number, t: number) => THREE.TorusGeometry;
  };
  getColor: (id: string, fb: string) => string;
  getTexture: (id: string) => string | undefined;
  selectedPart: string | null;
  onPartClick: (id: string) => void;
};

function BackpackModel({ g, getColor, getTexture, selectedPart, onPartClick }: ModelProps) {
  const body = useMemo(() => g.box(1.6, 2.0, 0.8), [g]);
  const frontPocket = useMemo(() => g.box(1.3, 0.8, 0.15), [g]);
  const sidePocket = useMemo(() => g.box(0.15, 0.7, 0.5), [g]);
  const strap = useMemo(() => g.box(0.15, 1.8, 0.08), [g]);
  const handle = useMemo(() => g.torus(0.2, 0.04), [g]);
  const bottom = useMemo(() => g.box(1.6, 0.12, 0.8), [g]);
  const zipLine = useMemo(() => g.box(1.2, 0.03, 0.03), [g]);

  return (
    <group position={[0, 0, 0]}>
      <PartMesh geometry={body} color={getColor("body", "#2563eb")} textureUrl={getTexture("body")} partId="body" isSelected={selectedPart === "body"} onClick={onPartClick} position={[0, 0.2, 0]} />
      <PartMesh geometry={frontPocket} color={getColor("front_pocket", "#1d4ed8")} textureUrl={getTexture("front_pocket")} partId="front_pocket" isSelected={selectedPart === "front_pocket"} onClick={onPartClick} position={[0, -0.3, 0.48]} />
      <PartMesh geometry={sidePocket} color={getColor("side_pocket_left", "#1e40af")} textureUrl={getTexture("side_pocket_left")} partId="side_pocket_left" isSelected={selectedPart === "side_pocket_left"} onClick={onPartClick} position={[-0.88, 0, 0]} />
      <PartMesh geometry={sidePocket} color={getColor("side_pocket_right", "#1e40af")} textureUrl={getTexture("side_pocket_right")} partId="side_pocket_right" isSelected={selectedPart === "side_pocket_right"} onClick={onPartClick} position={[0.88, 0, 0]} />
      <PartMesh geometry={strap} color={getColor("shoulder_strap_left", "#1e293b")} textureUrl={getTexture("shoulder_strap_left")} partId="shoulder_strap_left" isSelected={selectedPart === "shoulder_strap_left"} onClick={onPartClick} position={[-0.55, 0.2, -0.48]} rotation={[0.15, 0, 0.1]} />
      <PartMesh geometry={strap} color={getColor("shoulder_strap_right", "#1e293b")} textureUrl={getTexture("shoulder_strap_right")} partId="shoulder_strap_right" isSelected={selectedPart === "shoulder_strap_right"} onClick={onPartClick} position={[0.55, 0.2, -0.48]} rotation={[0.15, 0, -0.1]} />
      <PartMesh geometry={handle} color={getColor("top_handle", "#1e293b")} textureUrl={getTexture("top_handle")} partId="top_handle" isSelected={selectedPart === "top_handle"} onClick={onPartClick} position={[0, 1.35, -0.1]} rotation={[Math.PI / 2, 0, 0]} />
      <PartMesh geometry={body} color={getColor("back_panel", "#334155")} textureUrl={getTexture("back_panel")} partId="back_panel" isSelected={selectedPart === "back_panel"} onClick={onPartClick} position={[0, 0.2, -0.42]} />
      <PartMesh geometry={zipLine} color={getColor("zipper", "#94a3b8")} textureUrl={getTexture("zipper")} partId="zipper" isSelected={selectedPart === "zipper"} onClick={onPartClick} position={[0, 0.85, 0.42]} />
      <PartMesh geometry={bottom} color={getColor("bottom", "#0f172a")} textureUrl={getTexture("bottom")} partId="bottom" isSelected={selectedPart === "bottom"} onClick={onPartClick} position={[0, -0.86, 0]} />
    </group>
  );
}

function CollegeBagModel({ g, getColor, getTexture, selectedPart, onPartClick }: ModelProps) {
  const body = useMemo(() => g.box(1.6, 2.0, 0.7), [g]);
  const flap = useMemo(() => g.box(1.6, 0.8, 0.1), [g]);
  const frontPocket = useMemo(() => g.box(1.3, 0.6, 0.12), [g]);
  const strap = useMemo(() => g.box(0.15, 1.8, 0.08), [g]);
  const handle = useMemo(() => g.torus(0.2, 0.04), [g]);
  const buckle = useMemo(() => g.cylinder(0.06, 0.06, 0.04, 16), [g]);
  const bottom = useMemo(() => g.box(1.6, 0.12, 0.7), [g]);
  const laptopSleeve = useMemo(() => g.box(1.3, 1.5, 0.05), [g]);

  return (
    <group position={[0, 0, 0]}>
      <PartMesh geometry={body} color={getColor("body", "#059669")} textureUrl={getTexture("body")} partId="body" isSelected={selectedPart === "body"} onClick={onPartClick} position={[0, 0.2, 0]} />
      <PartMesh geometry={flap} color={getColor("flap", "#047857")} textureUrl={getTexture("flap")} partId="flap" isSelected={selectedPart === "flap"} onClick={onPartClick} position={[0, 0.9, 0.4]} rotation={[0.4, 0, 0]} />
      <PartMesh geometry={frontPocket} color={getColor("front_pocket", "#065f46")} textureUrl={getTexture("front_pocket")} partId="front_pocket" isSelected={selectedPart === "front_pocket"} onClick={onPartClick} position={[0, -0.2, 0.42]} />
      <PartMesh geometry={laptopSleeve} color={getColor("laptop_sleeve", "#064e3b")} textureUrl={getTexture("laptop_sleeve")} partId="laptop_sleeve" isSelected={selectedPart === "laptop_sleeve"} onClick={onPartClick} position={[0, 0.2, -0.05]} />
      <PartMesh geometry={strap} color={getColor("shoulder_strap_left", "#1e293b")} textureUrl={getTexture("shoulder_strap_left")} partId="shoulder_strap_left" isSelected={selectedPart === "shoulder_strap_left"} onClick={onPartClick} position={[-0.55, 0.2, -0.42]} rotation={[0.15, 0, 0.1]} />
      <PartMesh geometry={strap} color={getColor("shoulder_strap_right", "#1e293b")} textureUrl={getTexture("shoulder_strap_right")} partId="shoulder_strap_right" isSelected={selectedPart === "shoulder_strap_right"} onClick={onPartClick} position={[0.55, 0.2, -0.42]} rotation={[0.15, 0, -0.1]} />
      <PartMesh geometry={handle} color={getColor("top_handle", "#1e293b")} textureUrl={getTexture("top_handle")} partId="top_handle" isSelected={selectedPart === "top_handle"} onClick={onPartClick} position={[0, 1.35, -0.1]} rotation={[Math.PI / 2, 0, 0]} />
      <PartMesh geometry={body} color={getColor("back_panel", "#334155")} textureUrl={getTexture("back_panel")} partId="back_panel" isSelected={selectedPart === "back_panel"} onClick={onPartClick} position={[0, 0.2, -0.37]} />
      <PartMesh geometry={buckle} color={getColor("buckle", "#d4d4d8")} textureUrl={getTexture("buckle")} partId="buckle" isSelected={selectedPart === "buckle"} onClick={onPartClick} position={[0, 0.35, 0.52]} />
      <PartMesh geometry={bottom} color={getColor("bottom", "#0f172a")} textureUrl={getTexture("bottom")} partId="bottom" isSelected={selectedPart === "bottom"} onClick={onPartClick} position={[0, -0.86, 0]} />
    </group>
  );
}

function DuffelBagModel({ g, getColor, getTexture, selectedPart, onPartClick }: ModelProps) {
  const body = useMemo(() => g.cylinder(0.7, 0.7, 2.2, 32), [g]);
  const endCap = useMemo(() => g.sphere(0.7), [g]);
  const strap = useMemo(() => g.box(0.1, 0.05, 3.0), [g]);
  const handle = useMemo(() => g.torus(0.25, 0.04), [g]);
  const sidePocket = useMemo(() => g.box(0.5, 0.5, 0.12), [g]);
  const zipLine = useMemo(() => g.box(0.03, 0.03, 2.0), [g]);
  const bottom = useMemo(() => g.box(1.8, 0.1, 0.8), [g]);

  return (
    <group rotation={[0, 0, Math.PI / 2]} position={[0, 0.2, 0]}>
      <PartMesh geometry={body} color={getColor("body", "#dc2626")} textureUrl={getTexture("body")} partId="body" isSelected={selectedPart === "body"} onClick={onPartClick} position={[0, 0, 0]} />
      <PartMesh geometry={endCap} color={getColor("end_left", "#b91c1c")} textureUrl={getTexture("end_left")} partId="end_left" isSelected={selectedPart === "end_left"} onClick={onPartClick} position={[0, -1.1, 0]} />
      <PartMesh geometry={endCap} color={getColor("end_right", "#b91c1c")} textureUrl={getTexture("end_right")} partId="end_right" isSelected={selectedPart === "end_right"} onClick={onPartClick} position={[0, 1.1, 0]} />
      <PartMesh geometry={strap} color={getColor("shoulder_strap", "#1e293b")} textureUrl={getTexture("shoulder_strap")} partId="shoulder_strap" isSelected={selectedPart === "shoulder_strap"} onClick={onPartClick} position={[0.75, 0, 0]} rotation={[0, 0, 0.3]} />
      <PartMesh geometry={handle} color={getColor("carry_handles", "#1e293b")} textureUrl={getTexture("carry_handles")} partId="carry_handles" isSelected={selectedPart === "carry_handles"} onClick={onPartClick} position={[-0.75, 0, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <PartMesh geometry={sidePocket} color={getColor("side_pocket", "#991b1b")} textureUrl={getTexture("side_pocket")} partId="side_pocket" isSelected={selectedPart === "side_pocket"} onClick={onPartClick} position={[0, 0.6, 0.72]} />
      <PartMesh geometry={zipLine} color={getColor("zipper", "#94a3b8")} textureUrl={getTexture("zipper")} partId="zipper" isSelected={selectedPart === "zipper"} onClick={onPartClick} position={[-0.72, 0, 0]} />
      <PartMesh geometry={bottom} color={getColor("bottom", "#0f172a")} textureUrl={getTexture("bottom")} partId="bottom" isSelected={selectedPart === "bottom"} onClick={onPartClick} position={[0.72, 0, 0]} />
    </group>
  );
}

function MessengerBagModel({ g, getColor, getTexture, selectedPart, onPartClick }: ModelProps) {
  const body = useMemo(() => g.box(2.0, 1.2, 0.6), [g]);
  const flap = useMemo(() => g.box(2.0, 1.0, 0.08), [g]);
  const strap = useMemo(() => g.box(0.12, 0.05, 3.5), [g]);
  const frontPocket = useMemo(() => g.box(0.8, 0.6, 0.1), [g]);
  const buckle = useMemo(() => g.cylinder(0.06, 0.06, 0.04, 16), [g]);
  const bottom = useMemo(() => g.box(2.0, 0.1, 0.6), [g]);

  return (
    <group position={[0, 0, 0]}>
      <PartMesh geometry={body} color={getColor("body", "#7c3aed")} textureUrl={getTexture("body")} partId="body" isSelected={selectedPart === "body"} onClick={onPartClick} position={[0, 0, 0]} />
      <PartMesh geometry={flap} color={getColor("flap", "#6d28d9")} textureUrl={getTexture("flap")} partId="flap" isSelected={selectedPart === "flap"} onClick={onPartClick} position={[0, 0.4, 0.35]} rotation={[0.5, 0, 0]} />
      <PartMesh geometry={strap} color={getColor("shoulder_strap", "#1e293b")} textureUrl={getTexture("shoulder_strap")} partId="shoulder_strap" isSelected={selectedPart === "shoulder_strap"} onClick={onPartClick} position={[0, 1.0, 0]} rotation={[0.8, 0, 0]} />
      <PartMesh geometry={frontPocket} color={getColor("front_pocket", "#5b21b6")} textureUrl={getTexture("front_pocket")} partId="front_pocket" isSelected={selectedPart === "front_pocket"} onClick={onPartClick} position={[-0.4, -0.1, 0.35]} />
      <PartMesh geometry={body} color={getColor("back_panel", "#334155")} textureUrl={getTexture("back_panel")} partId="back_panel" isSelected={selectedPart === "back_panel"} onClick={onPartClick} position={[0, 0, -0.32]} />
      <PartMesh geometry={buckle} color={getColor("buckle", "#d4d4d8")} textureUrl={getTexture("buckle")} partId="buckle" isSelected={selectedPart === "buckle"} onClick={onPartClick} position={[0, -0.05, 0.42]} />
      <PartMesh geometry={bottom} color={getColor("bottom", "#0f172a")} textureUrl={getTexture("bottom")} partId="bottom" isSelected={selectedPart === "bottom"} onClick={onPartClick} position={[0, -0.65, 0]} />
    </group>
  );
}

function ToteBagModel({ g, getColor, getTexture, selectedPart, onPartClick }: ModelProps) {
  const body = useMemo(() => g.box(1.8, 1.8, 0.6), [g]);
  const handle = useMemo(() => g.torus(0.35, 0.05), [g]);
  const frontPanel = useMemo(() => g.box(1.4, 1.0, 0.08), [g]);
  const innerPocket = useMemo(() => g.box(0.8, 0.5, 0.04), [g]);
  const bottom = useMemo(() => g.box(1.8, 0.1, 0.6), [g]);

  return (
    <group position={[0, 0, 0]}>
      <PartMesh geometry={body} color={getColor("body", "#ec4899")} textureUrl={getTexture("body")} partId="body" isSelected={selectedPart === "body"} onClick={onPartClick} position={[0, 0, 0]} />
      <PartMesh geometry={handle} color={getColor("handle_left", "#be185d")} textureUrl={getTexture("handle_left")} partId="handle_left" isSelected={selectedPart === "handle_left"} onClick={onPartClick} position={[-0.4, 1.2, 0]} rotation={[0, 0, 0]} />
      <PartMesh geometry={handle} color={getColor("handle_right", "#be185d")} textureUrl={getTexture("handle_right")} partId="handle_right" isSelected={selectedPart === "handle_right"} onClick={onPartClick} position={[0.4, 1.2, 0]} rotation={[0, 0, 0]} />
      <PartMesh geometry={innerPocket} color={getColor("inner_pocket", "#9d174d")} textureUrl={getTexture("inner_pocket")} partId="inner_pocket" isSelected={selectedPart === "inner_pocket"} onClick={onPartClick} position={[0, 0.3, 0.1]} />
      <PartMesh geometry={frontPanel} color={getColor("front_panel", "#db2777")} textureUrl={getTexture("front_panel")} partId="front_panel" isSelected={selectedPart === "front_panel"} onClick={onPartClick} position={[0, -0.1, 0.34]} />
      <PartMesh geometry={body} color={getColor("back_panel", "#be185d")} textureUrl={getTexture("back_panel")} partId="back_panel" isSelected={selectedPart === "back_panel"} onClick={onPartClick} position={[0, 0, -0.32]} />
      <PartMesh geometry={bottom} color={getColor("bottom", "#0f172a")} textureUrl={getTexture("bottom")} partId="bottom" isSelected={selectedPart === "bottom"} onClick={onPartClick} position={[0, -0.95, 0]} />
    </group>
  );
}

function LaptopBagModel({ g, getColor, getTexture, selectedPart, onPartClick }: ModelProps) {
  const body = useMemo(() => g.box(2.2, 1.4, 0.5), [g]);
  const frontPocket = useMemo(() => g.box(1.8, 1.0, 0.12), [g]);
  const strap = useMemo(() => g.box(0.12, 0.05, 3.5), [g]);
  const handle = useMemo(() => g.torus(0.25, 0.04), [g]);
  const laptopPad = useMemo(() => g.box(2.0, 1.2, 0.06), [g]);
  const zipLine = useMemo(() => g.box(1.8, 0.03, 0.03), [g]);
  const bottom = useMemo(() => g.box(2.2, 0.1, 0.5), [g]);

  return (
    <group position={[0, 0, 0]}>
      <PartMesh geometry={body} color={getColor("body", "#0891b2")} textureUrl={getTexture("body")} partId="body" isSelected={selectedPart === "body"} onClick={onPartClick} position={[0, 0, 0]} />
      <PartMesh geometry={frontPocket} color={getColor("front_pocket", "#0e7490")} textureUrl={getTexture("front_pocket")} partId="front_pocket" isSelected={selectedPart === "front_pocket"} onClick={onPartClick} position={[0, -0.05, 0.32]} />
      <PartMesh geometry={strap} color={getColor("shoulder_strap", "#1e293b")} textureUrl={getTexture("shoulder_strap")} partId="shoulder_strap" isSelected={selectedPart === "shoulder_strap"} onClick={onPartClick} position={[0, 0.9, 0]} rotation={[0.8, 0, 0]} />
      <PartMesh geometry={handle} color={getColor("top_handle", "#1e293b")} textureUrl={getTexture("top_handle")} partId="top_handle" isSelected={selectedPart === "top_handle"} onClick={onPartClick} position={[0, 0.95, -0.05]} rotation={[Math.PI / 2, 0, 0]} />
      <PartMesh geometry={laptopPad} color={getColor("laptop_pad", "#334155")} textureUrl={getTexture("laptop_pad")} partId="laptop_pad" isSelected={selectedPart === "laptop_pad"} onClick={onPartClick} position={[0, 0, -0.05]} />
      <PartMesh geometry={body} color={getColor("back_panel", "#334155")} textureUrl={getTexture("back_panel")} partId="back_panel" isSelected={selectedPart === "back_panel"} onClick={onPartClick} position={[0, 0, -0.27]} />
      <PartMesh geometry={zipLine} color={getColor("zipper", "#94a3b8")} textureUrl={getTexture("zipper")} partId="zipper" isSelected={selectedPart === "zipper"} onClick={onPartClick} position={[0, 0.55, 0.27]} />
      <PartMesh geometry={bottom} color={getColor("bottom", "#0f172a")} textureUrl={getTexture("bottom")} partId="bottom" isSelected={selectedPart === "bottom"} onClick={onPartClick} position={[0, -0.75, 0]} />
    </group>
  );
}
