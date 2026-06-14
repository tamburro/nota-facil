"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const CORAL = "#ff7759";
const PAPER = "#f5f5f0";
const INK = "#17171c";

function makeQrTexture() {
  const size = 132;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  const cells = 11;
  const cell = size / cells;
  ctx.fillStyle = "#0a0a0f";
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      if ((x * 7 + y * 13 + x * y) % 3 === 0) {
        ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    }
  }

  // finder squares nos 3 cantos
  const drawFinder = (px: number, py: number) => {
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(px, py, cell * 3, cell * 3);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(px + cell * 0.6, py + cell * 0.6, cell * 1.8, cell * 1.8);
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(px + cell, py + cell, cell, cell);
  };
  drawFinder(0, 0);
  drawFinder(size - cell * 3, 0);
  drawFinder(0, size - cell * 3);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const textLines = [
  { y: 0.7, w: 1.7 },
  { y: 0.42, w: 1.4 },
  { y: 0.14, w: 1.7 },
  { y: -0.14, w: 1.2 },
];

function Invoice({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const qrTexture = useMemo(() => makeQrTexture(), []);

  useEffect(() => {
    if (reducedMotion) return;
    const handler = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, [reducedMotion]);

  useEffect(() => () => qrTexture.dispose(), [qrTexture]);

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.8) * 0.12;
    const targetX = -pointer.current.y * 0.22 - 0.08;
    const targetY = pointer.current.x * 0.4 - 0.25;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.045,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      0.045,
    );
  });

  return (
    <group ref={group} rotation={[-0.08, -0.25, 0]}>
      {/* papel */}
      <RoundedBox args={[2.5, 3.3, 0.08]} radius={0.07} smoothness={4}>
        <meshStandardMaterial color={PAPER} roughness={0.65} metalness={0} />
      </RoundedBox>

      {/* faixa coral do cabeçalho */}
      <mesh position={[0, 1.25, 0.045]}>
        <boxGeometry args={[2.1, 0.36, 0.01]} />
        <meshStandardMaterial color={CORAL} roughness={0.5} />
      </mesh>

      {/* linhas de texto */}
      {textLines.map((l, i) => (
        <mesh key={i} position={[-1 + l.w / 2, l.y, 0.045]}>
          <boxGeometry args={[l.w, 0.11, 0.01]} />
          <meshStandardMaterial color="#c9c9c4" roughness={0.8} />
        </mesh>
      ))}

      {/* QR code do Pix */}
      <mesh position={[-0.55, -0.95, 0.045]}>
        <planeGeometry args={[0.85, 0.85]} />
        <meshStandardMaterial map={qrTexture} roughness={0.9} />
      </mesh>

      {/* valor / total */}
      <mesh position={[0.62, -0.78, 0.045]}>
        <boxGeometry args={[0.85, 0.18, 0.01]} />
        <meshStandardMaterial color={INK} roughness={0.7} />
      </mesh>
      <mesh position={[0.62, -1.08, 0.045]}>
        <boxGeometry args={[0.65, 0.1, 0.01]} />
        <meshStandardMaterial color="#c9c9c4" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function NotaFiscal3D() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  if (!mounted) return <div className="h-[340px] w-full" aria-hidden />;

  return (
    <div className="h-[340px] w-full" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <pointLight position={[-4, -2, 3]} intensity={20} color={CORAL} />
        <Invoice reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
