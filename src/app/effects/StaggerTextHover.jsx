import React from "react";
import { motion } from "framer-motion";

export default function StaggerTextHover({ text, activeColor = "#fff", className = "" }) {
  const parent = {
    enter: {
      transition: {
        staggerChildren: 0.07,
      },
    },
    hover: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const wave = {
    initial: { y: 0, scale: 1 },
    enter: {
      y: [0, -10, 0],
      scale: [1, 1.3, 1],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    hover: {
      y: [0, -10, 0],
      scale: [1, 1.3, 1],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.h1
      initial="initial"
      animate="enter"
      whileHover="hover"
      variants={parent}
      className={className}
    >
      {text.map((p, index) => (
        <span key={index} className="overflow-hidden">
          <motion.span
            variants={wave}
            className="inline-flex"
            animate={{ color: activeColor }} // 👈 animate text color on prop change
            transition={{ duration: 0.6, ease: "easeInOut" }} // 👈 smooth transition
          >
            {p === "*" ? (
              <motion.span
                className="ml-[4px] w-[8px] h-[8px] rounded-full"
                animate={{ backgroundColor: activeColor }} // 👈 animate dot bg
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            ) : (
              p
            )}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
