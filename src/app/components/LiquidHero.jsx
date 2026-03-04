"use client";

import { useEffect, useRef } from "react";
import LiquidBackground from "threejs-components/build/backgrounds/liquid1.min.js";

export default function LiquidHero() {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    requestAnimationFrame(() => {
      appRef.current = LiquidBackground(canvasRef.current);

      appRef.current.loadImage(
        "https://assets.codepen.io/33787/liquid.webp"
      );

      appRef.current.liquidPlane.material.metalness = 0.75;
      appRef.current.liquidPlane.material.roughness = 0.25;
      appRef.current.liquidPlane.uniforms.displacementScale.value = 5;

      appRef.current.setRain(false);
    });
  }, []);

  return (
    <div className="relative inset-0 w-screen h-screen overflow-hidden font-[Montserrat]">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
      />

      {/* Bottom Link */}
      <a
        href="https://www.framer.com/@kevin-levron/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[30px] left-1/2 -translate-x-1/2 text-white no-underline drop-shadow-[1px_1px_2px_black]"
      >
        Framer Component
      </a>
    </div>
  );
}