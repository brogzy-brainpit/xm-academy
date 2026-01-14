"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03, // 👈 control stagger here
      delayChildren:2
    },
  },
};

const barVariants = {
  hidden: {
    scaleY: 0,
  },
  show: {
  scaleY: 1,
  transition: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  },
},
};

export default function BarcodeMotion({preLoaderOut}) {
  return (
      <svg className="bg-orange500"
        width="100%"
        // height="92"
        viewBox="0 0 266 118"
        role="img"
        aria-label="Barcode preview"
      >
        <rect width="266" height="142" fill="transparent" />

        <motion.g
          transform="translate(10, 10)"
          fill="#fff"
          variants={containerVariants}
          initial="hidden"
          animate={preLoaderOut?"show":"initial"}
           className={'origin-top'}
              style={{
                 transformOrigin: "50% 0%",
                // transformBox: "fill-box",
              }}
        >
          {bars.map((bar, i) => (
            <motion.rect
              key={i}
              {...bar}
              variants={barVariants}
             
            />
          ))}

          {/* <text
            x="123"
            y="122"
            textAnchor="middle"
            style={{ font: "20px Roboto", fill: "#000" }}
          >
            6159876543211
          </text> */}
        </motion.g>
      </svg>
      
    // <svg xmlns="http://www.w3.org/2000/svg" width="268" height="144">
    // </svg>
  );
}

const bars = [
  { x: 0, y: 0, width: 4, height: 100 },
  { x: 6, y: 0, width: 2, height: 100 },
  { x: 12, y: 0, width: 6, height: 100 },
  { x: 22, y: 0, width: 4, height: 100 },
  { x: 30, y: 0, width: 2, height: 100 },
  { x: 40, y: 0, width: 2, height: 100 },
  { x: 44, y: 0, width: 6, height: 100 },
  { x: 56, y: 0, width: 4, height: 100 },
  { x: 62, y: 0, width: 2, height: 100 },
  { x: 66, y: 0, width: 8, height: 100 },
  { x: 78, y: 0, width: 2, height: 100 },
  { x: 82, y: 0, width: 2, height: 100 },
  { x: 88, y: 0, width: 2, height: 100 },
  { x: 94, y: 0, width: 2, height: 100 },
  { x: 98, y: 0, width: 4, height: 100 },
  { x: 110, y: 0, width: 2, height: 100 },
  { x: 114, y: 0, width: 4, height: 100 },
  { x: 124, y: 0, width: 6, height: 100 },
  { x: 132, y: 0, width: 4, height: 100 },
  { x: 138, y: 0, width: 6, height: 100 },
  { x: 148, y: 0, width: 2, height: 100 },
  { x: 154, y: 0, width: 6, height: 100 },
  { x: 162, y: 0, width: 2, height: 100 },
  { x: 166, y: 0, width: 8, height: 100 },
  { x: 176, y: 0, width: 2, height: 100 },
  { x: 182, y: 0, width: 6, height: 100 },
  { x: 192, y: 0, width: 4, height: 100 },
  { x: 198, y: 0, width: 4, height: 100 },
  { x: 208, y: 0, width: 4, height: 100 },
  { x: 214, y: 0, width: 4, height: 100 },
  { x: 220, y: 0, width: 4, height: 100 },
  { x: 230, y: 0, width: 6, height: 100 },
  { x: 238, y: 0, width: 2, height: 100 },
  { x: 242, y: 0, width: 4, height: 100 },
];
