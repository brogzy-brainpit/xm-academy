"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import useScrollDirection from "../hooks/useScrollDirection";

export default function MarqueeX({ numbers=4,children, speed = 160 ,className=''}) {
  const itemRefs = useRef([]);
  const x = useMotionValue(0);
  const velocity = useRef(speed);

  const scrollDirection = useScrollDirection();
  const [step, setStep] = useState(0);

  useLayoutEffect(() => {
    if (itemRefs.current.length < 2) return;

    const measure = () => {
      const a = itemRefs.current[0];
      const b = itemRefs.current[1];

      // exact visual distance between repeats
      const distance =
        b.getBoundingClientRect().left -
        a.getBoundingClientRect().left;

      setStep(distance);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useLayoutEffect(() => {
    velocity.current = scrollDirection === "up" ? speed : -speed;
  }, [scrollDirection, speed]);

  useAnimationFrame((_, delta) => {
    if (!step) return;

    let next = x.get() + velocity.current * (delta / 1000);

    // wrap at the exact step distance
    if (next <= -step) next += step;
    if (next >= 0) next -= step;

    x.set(next);
  });

  return (
    <div className={`${className} overflow-hidden whitespace-nowrap `}>
      <motion.div className="flex gap-4 w-max" style={{ x }}>
        {[...Array(numbers)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (itemRefs.current[i] = el)}
            className="flex shrink-0"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
