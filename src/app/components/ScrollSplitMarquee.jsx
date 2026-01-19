/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */


import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import MarqueeX from './MarqueeX'
import { useScroll, useTransform ,motion, useMotionTemplate, useMotionValueEvent, useAnimation, useSpring} from 'framer-motion'
// import DisplacedParagraph from '@/components/DisplacedParagraph';


function ScrollSplitMarquee() {
    
    const container = useRef(null)
    const [speed1, setSpeed1] = useState(160)
    const [flip, setFlip] = useState(false)
      const control= useAnimation()
    
   const {scrollYProgress} = useScroll({target:container,offset:["start start","end end"]})
 const carden={
    initial:(i)=>({
    rotateX:i==1?'180deg':'0deg',
    transition:{duration:.25}
  }),
    flip:(i)=>({
     rotateX:i==1?'0deg':'180deg',
    transition:{duration:.25}
  })
   }
  useEffect(()=>{
       if(flip){
  control.start('flip')
  }else{
   control.start('initial')
  }
  },[flip,control])

useMotionValueEvent(scrollYProgress,'change',(v)=>{
 
const run=()=>{
   if(v>.15){
      setFlip(true)
  }else if(v<=.15){
      setFlip(false)
  }
} 
requestAnimationFrame(run)
})
  const offset= useTransform(scrollYProgress,[0.05,.65],[0,140/2])
  const Mrq22= useTransform(scrollYProgress,[0.05,.65],[50,0])
  const Mrq222= useTransform(scrollYProgress,[0.05,.65],[50,100])
const Mrq1 = useMotionTemplate`
  calc(${Mrq22}% + ${offset}px)
`;

const Mrq2 = useMotionTemplate`
  calc(${Mrq222}% - ${offset}px)
`;
  
   const height= useTransform(scrollYProgress,[0,.65],['0%','99%'])
    const  text= 'Master the art of cryptocurrency trading with guidance from experienced professionals. Our academy provides in-depth lessons, proven trading strategies, and real-world insights to help you make informed decisions in the market.'.split(' ')
  return (
  <div ref={container} className='h-[600vh] '>
      <div  className='h-screen sticky top-0 overflow-hidden  flex items-center justify-center'>
        <motion.div style={{height}} className='bg-neutral-900 w-full h-[20%] flex items-center justify-center overflow-hidden'>
<p className='max-w-[24em] flex flex-wrap justify-center text-center font-body leading-[1.5 lg:leading-[1.3] text-heading3 lg:text-heading3 text-balance  text-white'>
  {text.map((word,i)=>{
    const total=text.length
    const OUT_START=.5
    const OUT_END=.8
     const outWindow = OUT_END - OUT_START;
              const start = OUT_START + (i / total) * outWindow;
              const end = start + outWindow / total;
    const opacity= useSpring(useTransform(scrollYProgress,[start,end],[0.1,1]),{stiffness:180,damping:12})
    // const y= useSpring(useTransform(scrollYProgress,[start,end],[20,0]),{stiffness:180,damping:20})
    // const x= useSpring(useTransform(scrollYProgress,[start,end],[20,0]),{stiffness:180,damping:20})
    return <span key={i} className='relative mr-[.34em] flex gap-2'>
      <motion.span style={{opacity}} className='inline-block'>{word}</motion.span>
      {/* <motion.span style={{opacity:.1,y,x}} className='absolute inline-block'>{word}</motion.span> */}
    </span>
  })}
</p>

{/* <DisplacedParagraph
 text='ddd Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita optio blanditiis velit labore excepturi consequuntur libero, ipsa non est laudantium aliquam laborum dicta dolores debitis vel officia voluptatem vero.' className='max-w-[30em] text-center font-custom text-heading2 text-white'>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita optio blanditiis velit labore excepturi consequuntur libero, ipsa non est laudantium aliquam laborum dicta dolores debitis vel officia voluptatem vero.
</DisplacedParagraph> */}
        </motion.div>

        <motion.div style={{top:Mrq1}} className=' w-full h-[140px] border-none [clip-path:polygon(0%_0%,_100%_0%,_100%_calc(50%_+_0.53px),_0%_calc(50%_+_0.53px))]  absolute top-1/2 left-0  -translate-y-1/2 '>
      <motion.div animate={control} variants={carden} custom={1}
       className='[perspective:_1000px] [backface-visibility:hidden]  div1 absolute top-0
        bgpurple-600 bg-brand-accent h-[50%] flex items-center justify-cente text-heading2 font-custom w-full'>
 <MarqueeX numbers={6} speed={-speed1}  className='border-none bg-gree-600' >
        <h2 className=' font-custom flex items-center justify-center gap-4
         uppercase bgemerald-700 text-white text-heading2'>
          GET STARTED NOW 
           <img src='/images/crypto/bitcoin.svg' className='w-10 h-10'/>
           {/* Email Developer  */}
          </h2>
        </MarqueeX>
      </motion.div>


      <motion.div animate={control} variants={carden} custom={2}
       className='[perspective:_1000px] flex
        items-center h-full div2 [backface-visibility:hidden]  border-none bg-brand-secondary' >
      <MarqueeX speed={speed1} numbers={5}   >
        <h2 className='font-custom flex items-center justify-center gap-4 uppercase bgemerald-700 text-brand-text text-heading2'>
          No.1 for a reason
           <img src='/images/crypto/tron.svg' className='w-20 h-20'/>
          </h2>
        </MarqueeX>
      </motion.div>
        </motion.div>

        <motion.div style={{top:Mrq2}}  className='w-full h-[140px] flex 
        border-none [clip-path:polygon(0%_calc(50%_+_0.53px),_100%_calc(50%_+_0.53px),_100%_100%,_0%_100%)]
         absolute top-1/2 left-0  -translate-y-1/2 '>
       <motion.div animate={control} variants={carden} custom={1}
       className='[perspective:_1000px] [backface-visibility:hidden]   div1 absolute bottom-0
        bgpurple-600 bg-brand-accent h-[50%] flex  items-center justify-cente text-heading2 font-custom w-full'>
       <MarqueeX numbers={6} speed={speed1}  className='border-none bg-gree-600' >
        <h2 className=' font-custom flex items-center justify-center gap-4
         uppercase bgemerald-700 text-white text-heading2'>
          GET STARTED NOW 
           <img src='/images/crypto/bitcoin.svg' className='w-10 h-10'/>
          </h2>
        </MarqueeX>
      </motion.div>
      <motion.div animate={control} variants={carden} custom={2}
       className='[perspective:_1000px] flex w-full
        items-center h-full div2 [backface-visibility:hidden]  border-none bg-brand-secondary' >
      <MarqueeX speed={speed1} numbers={5}  >
        <h2 className='font-custom flex items-center justify-center gap-4 uppercase bgemerald-700 text-brand-text text-heading2'>
          No.1 for a reason
           <img src='/images/crypto/tron.svg' className='w-20 h-20'/>
          </h2>
        </MarqueeX>
      </motion.div>

        </motion.div>
    </div>

  </div>
  )
}

export default ScrollSplitMarquee