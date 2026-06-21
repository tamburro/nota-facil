"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

const CORAL = "#ff7759";
const PAPER = "#f5f5f0";
const INK = "#17171c";
const LINE = "#cfcfca";

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawQr(
  ctx: CanvasRenderingContext2D,
  ox: number,
  oy: number,
  size: number,
) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(ox, oy, size, size);
  const cells = 11;
  const cell = size / cells;
  ctx.fillStyle = "#0a0a0f";
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      if ((x * 7 + y * 13 + x * y) % 3 === 0) {
        ctx.fillRect(ox + x * cell, oy + y * cell, cell, cell);
      }
    }
  }
  const finder = (px: number, py: number) => {
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(px, py, cell * 3, cell * 3);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(px + cell * 0.6, py + cell * 0.6, cell * 1.8, cell * 1.8);
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(px + cell, py + cell, cell, cell);
  };
  finder(ox, oy);
  finder(ox + size - cell * 3, oy);
  finder(ox, oy + size - cell * 3);
}

function makeInvoiceTexture() {
  const W = 560;
  const H = 740;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);

  // cartão (cantos arredondados; fora fica transparente)
  roundRect(ctx, 0, 0, W, H, 40);
  ctx.fillStyle = PAPER;
  ctx.fill();

  // faixa coral do cabeçalho
  roundRect(ctx, 56, 60, W - 112, 70, 16);
  ctx.fillStyle = CORAL;
  ctx.fill();

  // linhas de texto
  ctx.fillStyle = LINE;
  const lines: [number, number, number][] = [
    [56, 200, 340],
    [56, 246, 280],
    [56, 292, 340],
    [56, 338, 230],
  ];
  lines.forEach(([x, y, w]) => {
    roundRect(ctx, x, y, w, 18, 9);
    ctx.fill();
  });

  // QR do Pix
  drawQr(ctx, 56, 470, 170);

  // valor / total
  ctx.fillStyle = INK;
  roundRect(ctx, 316, 498, 188, 40, 8);
  ctx.fill();
  ctx.fillStyle = LINE;
  roundRect(ctx, 360, 558, 144, 20, 10);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function Invoice({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geomRef = useRef<THREE.PlaneGeometry>(null);
  const basePos = useRef<Float32Array | null>(null);
  const wavedOnce = useRef(false);
  const pointer = useRef({ x: 0, y: 0 });
  const texture = useMemo(() => makeInvoiceTexture(), []);

  useEffect(() => {
    if (reducedMotion) return;
    const handler = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, [reducedMotion]);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state) => {
    const g = group.current;
    if (g && !reducedMotion) {
      const t = state.clock.elapsedTime;
      g.position.y = Math.sin(t * 0.8) * 0.12;
      const targetX = -pointer.current.y * 0.22 - 0.08;
      const targetY = pointer.current.x * 0.4 - 0.25;
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.045);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.045);
    }

    // ondulação do papel
    const geo = geomRef.current;
    if (!geo) return;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    if (!basePos.current) basePos.current = Float32Array.from(pos.array);
    if (reducedMotion && wavedOnce.current) return;

    const t = reducedMotion ? 0 : state.clock.elapsedTime;
    const base = basePos.current;
    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3;
      const x = base[ix];
      const y = base[ix + 1];
      const nx = x / 1.25;
      pos.array[ix + 2] =
        -0.18 * (1 - nx * nx) + 0.012 * Math.sin(y * 1.1 + t * 0.5);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    wavedOnce.current = true;
  });

  return (
    <group ref={group} rotation={[-0.08, -0.25, 0]}>
      <mesh>
        <planeGeometry ref={geomRef} args={[2.5, 3.3, 40, 52]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.7}
          metalness={0}
          side={THREE.DoubleSide}
          alphaTest={0.5}
        />
      </mesh>
    </group>
  );
}

export default function NotaFiscal3D() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme === "light";

  useEffect(() => {
    setMounted(true);
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  if (!mounted)
    return <div className="h-[300px] w-full sm:h-[340px]" aria-hidden />;

  return (
    <div className="h-[300px] w-full sm:h-[340px]" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={light ? 1.55 : 0.9} />
        <directionalLight position={[3, 4, 5]} intensity={light ? 1.2 : 1.4} />
        <pointLight
          position={[-4, -2, 3]}
          intensity={light ? 7 : 20}
          color={CORAL}
        />
        <Invoice reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
