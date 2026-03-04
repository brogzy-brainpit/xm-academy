"use client";

import { useEffect, useRef } from "react";
import TubesCursor from "threejs-components/build/cursors/tubes1.min.js";

export default function TubesHero() {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    appRef.current = TubesCursor(canvasRef.current, {
      tubes: {
        colors: ["#f967fb", "#53bc28", "#6958d5"],
        lights: {
          intensity: 200,
          colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
        },
      },
    });

    const handleClick = () => {
      if (!appRef.current) return;

      const colors = randomColors(3);
      const lightsColors = randomColors(4);

      appRef.current.tubes.setColors(colors);
      appRef.current.tubes.setLightsColors(lightsColors);
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  function randomColors(count) {
    return new Array(count).fill(0).map(
      () =>
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute z-[999990999] inset-0 w-full h-full" />

      
    </div>
  );
}