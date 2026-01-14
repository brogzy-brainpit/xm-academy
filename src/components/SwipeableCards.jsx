"use client"

import React, { useState, useEffect } from "react"
import { motion, useTransform } from "framer-motion"
import CustomBtn from "./CustomBtn"
import useMouse from "./useMouse"

const cards = [ 
  {
    id: 3,
    options:[
      'Market insights',
      'trade ideas',
      'Entry and exit zones',
    ],
    title: "live signal community",
    month: 1,
    dollar: 80,
    naira: '100,000',
    desc2: "Stay connected to market movements through our live signal group, where experienced traders share.",
    desc: "Hands-on, in-person training designed for deeper learning, real-time feedback, and community connections.",
  },
  {
    id: 1,
    options:[
      'Free Ebook',
      'Beginner To Intermediate friendly',
      'educational breakdowns of trades',
      'structured learning paths',
      'one-on-one and group supports',
    ],
    title: "physical mentorship",
    month: 1,
    dollar: 300,
    naira: '300,000',
    desc: "Hands-on, in-person training designed for deeper learning, real-time feedback, and community connections.",
  },
  {
    id: 2,
    options:[
      'Free Ebook',
      'Beginner To Intermediate friendly',
      'educational breakdowns of trades',
      'structured learning paths',
      'recorded sessions',
    ],
    title: "online mentorship",
    month: 1,
    dollar: 300,
    naira: '300,000',
    desc: "Learn from anywhere through live classes, assignments and interactive discussions led by experinced traders",
  },
 
]

export function SwipeableCards() {
  const [current, setCurrent] = useState(0)
  const [scaleFactor, setScaleFactor] = useState(1)
  const [swipeThreshold, setSwipeThreshold] = useState(120)
   const {x,y}=  useMouse({start:{x:300,y:200}})
const newX= useTransform(x,x=>x-50)
const newY= useTransform(y,x=>x-50)
const [isHovered,setIsHovered]= useState(false)

  // ✅ Dynamically recalculate based on screen size
  useEffect(() => {
    const updateScale = () => {
      setScaleFactor(Math.min(window.innerWidth / 430, 1))
      setSwipeThreshold(window.innerWidth < 640 ? 60 : 120)
    }
    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [])

  const handleSwipe = (direction) => {
    if (direction === "right") {
      setCurrent((prev) => (prev + 1) % cards.length)
    } else if (direction === "left") {
      setCurrent((prev) => (prev - 1 + cards.length) % cards.length)
    }
  }

  return (
    <div className="py-10 flex items-center justify-center w-full overflow-hidden bg-black">
       <motion.div animate={{scale:isHovered?1:0}} style={{x:newX,y:newY}} className='fixed pointer-events-none flex items-center
        justify-center font-custom-condensed z-[999] top-0 left-0 w-[80px] 
        rounded-full border-white border shadow-2xl text-para bg-brand-accent text-white'>
drag
       </motion.div>
      <div className="relative w-[65vw]  sm:max-w-[14em] md:max-w-[20em] lg:max-w-[25em] aspect-[3/4.6] lg:aspect-[3/4] select-none">
        {cards.map((card, index) => {
          const offset = (index - current + cards.length) % cards.length
          let scale = 1 - Math.abs(offset) * 0.06
          let y = offset * 40 * scaleFactor
          let rotate = offset * 4
          let x = offset * 50 * scaleFactor

          // ✅ Custom layout tweaks
          if (offset === 1) {
            rotate =-18
            scale =  0.88 
            x = -100 * scaleFactor
            y = 0
          }

          if (offset === 2) {
            rotate=18
            scale =0.88 
            x = 100 * scaleFactor 
            y = 0
          }


          return (
            <motion.div
              key={card.id}
              onMouseEnter={()=>setIsHovered(true)}
              onMouseLeave={()=>setIsHovered(false)}
              className="cursor-[url('https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68384fb014875f192dfcef4b_cursor-drag.svg'),_grab] 
              absolute top-0 left-0 w-full h-full p-4 rounded-3xl overflow-hidden shadow-2xl  border-4 border-brand-text-dark"
              style={{
                zIndex: (() => {
                  let z = cards.length - offset
                  if (offset === 3) z = 1
                  if (offset === 4) z = 2
                  return z
                })(),
                   backgroundColor: (() => {
                    let bg;
                  if (card.id === 1 || card.id === 2 ) bg= '#16a34a'
                  else bg= '#7461c3'
                  return bg
                })(),
                transformOrigin: "center",
              }}
              animate={{
                scale,
                y,
                x,
                rotate,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 24,
              }}
              drag={offset === 0 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > swipeThreshold) handleSwipe("right")
                if (info.offset.x < -swipeThreshold) handleSwipe("left")
              }}
             > 
              <h2 className="text-heading3 opacity-85 font-custom text-white capitalize">{card.title}</h2>
              <ul className="lg:my-10 my-4 flex flex-col gap-2 list-disc pl-4 text-para fontbold font-body text-white capitalize">
                {card.options.map((option)=>{
                return <li>{option}</li>
              })}
              </ul>
              <div className="border-y py-2 w-full flex justify-between text-para font-body  text-white capitalize">
                <h2 className="flex-1">duration: {card.month} Month</h2>
              <h2 className=" flex-1 text-[.7em] lg:text-[.6em] text-right">{card.desc}</h2>
              </div>
               <div className="my-2 w-full flex justify-between items-center text-para font-body  text-white capitalize">
                <h2 className="flex-1 opacity-85 text-heading3 font-custom text-left">{card.naira}</h2>
              </div>
             
             <CustomBtn
              className={`${card.id==3?'bg-brand-secondar bg-transparent border border-white':'border border-white bg-brand-accent'}`} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
