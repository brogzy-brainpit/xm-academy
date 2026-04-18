/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */


import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import MarqueeX from './MarqueeX'
import { useScroll, useTransform ,motion, useMotionTemplate, useMotionValueEvent, useAnimation, useSpring} from 'framer-motion'
import Section from '@/app/layout/Section'
import GridColumn from '@/app/layout/GridColumn'
// import DisplacedParagraph from '@/components/DisplacedParagraph';


function ScrollSplitMarquee() {
    
    const container = useRef(null)
    const [speed1, setSpeed1] = useState(120)
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
   if(v>.35){
      setFlip(true)
  }else if(v<=.35){
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

  const accent1Words = [
  "market.",
  'trading,',
  'academy'
];
  const accent2Words = [
  "cryptocurrency",
  "experienced",
  "trading"
];
const hook="About Us"
const curiosity="get started now"
    return (
  <div ref={container} className='h-[600vh] '>
      <div id='about'  className='h-screen sticky top-0 overflow-hidden  flex items-center justify-center'>
        <motion.div style={{height}} className='bg-brand-black w-full h-[20%] flex items-center justify-center overflow-hidden'>
<Section>
  <GridColumn>
<div className='col-span-full lg:col-span-8 lg:col-start-3'>
<p className='flex flex-wrap justify-center text-center font-body leading-[1.5 lg:leading-[1.4] text-heading3  text-balance  text-brand-white'>
  {text.map((word,i)=>{
   
const isAccent1 = accent1Words.includes(word);
const isAccent2 = accent2Words.includes(word);
    const total=text.length
    const OUT_START=.5
    const OUT_END=.8
     const outWindow = OUT_END - OUT_START;
              const start = OUT_START + (i / total) * outWindow;
              const end = start + outWindow / total;
    const opacity= useSpring(useTransform(scrollYProgress,[start,end],[0.05,1]),{stiffness:180,damping:12})
    const scale= useSpring(useTransform(scrollYProgress,[start,end],[0,1]),{stiffness:180,damping:12})
    // const y= useSpring(useTransform(scrollYProgress,[start,end],[20,0]),{stiffness:180,damping:20})
    // const x= useSpring(useTransform(scrollYProgress,[start,end],[20,0]),{stiffness:180,damping:20})
    return <span key={i} className='relative mr-[.34em] flex gap-2'>
      <motion.span style={{opacity,scale:isAccent1 || isAccent2?scale:1}} 
       className={`inline-block leading-[1 my-[2px] align-middle ${isAccent1? "italic font-accent bg-brand-accent rounded-full px-2" :isAccent2? "italic font-accent bg-brand-secondary text-brand-black rounded-full px-2":""} `}
      >{word}</motion.span>
      {/* <motion.span style={{opacity:.1,y,x}} className='absolute inline-block'>{word}</motion.span> */}
    </span>
  })}
</p>

</div>
  </GridColumn>

</Section>

{/* <DisplacedParagraph
 text='ddd Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita optio blanditiis velit labore excepturi consequuntur libero, ipsa non est laudantium aliquam laborum dicta dolores debitis vel officia voluptatem vero.' className='max-w-[30em] text-center font-custom italic text-[clamp(4em,_6vw,_7em)] text-brand-white'>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore expedita optio blanditiis velit labore excepturi consequuntur libero, ipsa non est laudantium aliquam laborum dicta dolores debitis vel officia voluptatem vero.
</DisplacedParagraph> */}
        </motion.div>

        <motion.div style={{top:Mrq1}} className=' w-full h-[140px] border-none [clip-path:polygon(0%_0%,_100%_0%,_100%_calc(50%_+_0.53px),_0%_calc(50%_+_0.53px))]  absolute top-1/2 left-0  -translate-y-1/2 '>
      <motion.div animate={control} variants={carden} custom={1}
       className='[perspective:_1000px] [backface-visibility:hidden]  div1 absolute top-0
        bgpurple-600 bg-brand-accent h-[50%] flex items-center justify-cente italic w-full'>
 <MarqueeX numbers={6} speed={-speed1}  className='border-none bg-gree-600' >
        <h2 className=' font-custom italic flex items-center justify-center gap-4
         uppercase bgemerald-700 text-brand-white text-[clamp(4em,_6vw,_7em)]'>
           {/* {curiosity} */}
           i design
    <img style={{width:"20px",height:"20px"}} className='md:block hidden opacity-30'   src="https://images.ctfassets.net/fwy0yv14lkat/5X88SBFFc4hVAjMYmFK4js/7c8ae3f8120db2ff6f7ee315d3096266/Q8.svg"/>
      i code
    <img style={{width:"20px",height:"20px"}} className='md:block hidden opacity-30'   src="https://images.ctfassets.net/fwy0yv14lkat/5X88SBFFc4hVAjMYmFK4js/7c8ae3f8120db2ff6f7ee315d3096266/Q8.svg"/>
     i test
    <img style={{width:"20px",height:"20px"}} className='md:block hidden opacity-30'   src="https://images.ctfassets.net/fwy0yv14lkat/5X88SBFFc4hVAjMYmFK4js/7c8ae3f8120db2ff6f7ee315d3096266/Q8.svg"/>
     i fix
    <img style={{width:"20px",height:"20px"}} className='md:block hidden opacity-30'   src="https://images.ctfassets.net/fwy0yv14lkat/5X88SBFFc4hVAjMYmFK4js/7c8ae3f8120db2ff6f7ee315d3096266/Q8.svg"/>

           {/* Email Developer  */}
          </h2>
        </MarqueeX>
      </motion.div>


      <motion.div animate={control} variants={carden} custom={2}
       className='[perspective:_1000px] flex
        items-center h-full div2 [backface-visibility:hidden]  border-none bg-brand-secondary' >
      <MarqueeX speed={speed1} numbers={5}   >
        <h2 className='font-custom scale-y-[1.8] lg:scale-y-[1] font-bold  flex items-center justify-center
         gap-4 uppercase bgemerald-700 text-brand-black text-heading leading-[1.5]'>
          {hook}
           <motion.svg animate={{rotate:360}} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}  className='w-[.8em] h-[.6em]' viewBox="0 0 125 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M107.834 81.9065L94.7659 55.331C94.0992 53.9597 95.3659 52.4579 96.8327 52.7844L103.233 54.2209C104.233 54.4168 105.233 53.8291 105.433 52.8497L107.367 44.6877C107.567 43.7082 106.967 42.7288 105.967 42.5329L76.5646 35.938C75.0311 35.6115 74.6311 33.7179 75.8312 32.7385L80.9649 28.7554C81.7649 28.1025 81.8983 26.9924 81.2316 26.2089L75.8978 19.6793C75.2311 18.8957 74.0977 18.7651 73.2976 19.4181L49.7625 37.8316C48.5625 38.811 46.7623 37.9622 46.7623 36.3951V29.9308C46.7623 28.9513 45.9623 28.1025 44.8955 28.1025H36.3616C35.3615 28.1025 34.4947 28.886 34.4947 29.9308V59.4446C34.4947 60.9464 32.6946 61.7953 31.4945 60.8811L26.3608 56.8981C25.5608 56.2451 24.4273 56.3757 23.7606 57.1592L18.4269 63.6889C17.7602 64.4724 17.8935 65.5824 18.6936 66.2354L42.2287 84.6489C43.4288 85.6284 43.0287 87.5219 41.4953 87.8484L35.0948 89.2849C34.0947 89.4808 33.4947 90.4603 33.6947 91.4397L35.6282 99.6017C35.8282 100.581 36.8283 101.169 37.8283 100.973L67.2305 94.378C68.764 94.0515 69.9641 95.5534 69.2973 96.9246L66.4305 102.736C65.9638 103.65 66.3638 104.695 67.2972 105.152L75.0311 108.808C75.9645 109.266 77.0312 108.874 77.498 107.96L90.5656 81.3841C91.2323 80.0129 93.2325 80.0129 93.8992 81.3841L96.766 87.1955C97.2327 88.1096 98.2995 88.5014 99.2329 88.0443L106.967 84.3877C107.9 83.8654 108.234 82.8206 107.834 81.9065ZM80.4315 74.2015L73.3643 88.632C72.6309 90.1991 70.2974 89.9379 69.8974 88.2402L68.764 83.5389C68.5639 82.5594 67.5639 81.9718 66.5638 82.1677L50.6293 85.7589C48.8958 86.1507 47.6957 84.1918 48.7625 82.8859L51.8294 79.0987C52.4961 78.3152 52.3627 77.2052 51.5627 76.5522L38.7617 66.5619C37.3616 65.5171 38.1617 63.2971 39.8952 63.2971H44.8289C45.8289 63.2971 46.6956 62.5135 46.6956 61.4688V45.4712C46.6956 43.7735 48.8958 42.99 50.0292 44.3612L53.1628 48.0831C53.8295 48.8666 54.9629 48.9972 55.763 48.3443L68.4973 38.4193C69.8974 37.3745 71.8309 38.5498 71.4308 40.2475L70.2974 44.9489C70.0974 45.9283 70.6974 46.9077 71.6975 47.1036L87.632 50.6949C89.3655 51.0867 89.6322 53.3721 88.0321 54.0903L83.5651 56.1798C82.6317 56.6369 82.2316 57.6816 82.6983 58.5958L89.7655 73.0262C90.4989 74.5933 88.8988 76.2257 87.2987 75.4422L82.8317 73.3527C81.965 72.9609 80.8982 73.2874 80.4315 74.2015Z"
 fill="#262626"/>
</motion.svg>
           {/* <img src='/images/B1.svg' className='w-20 h-20'/> */}
          </h2>
        </MarqueeX>
      </motion.div>
        </motion.div>

        <motion.div style={{top:Mrq2}}  className='w-full h-[140px] flex 
        border-none [clip-path:polygon(0%_calc(50%_+_0.53px),_100%_calc(50%_+_0.53px),_100%_100%,_0%_100%)]
         absolute top-1/2 left-0  -translate-y-1/2 '>
       <motion.div animate={control} variants={carden} custom={1}
       className='[perspective:_1000px] [backface-visibility:hidden]   div1 absolute bottom-0
        bgpurple-600 bg-brand-accent h-[50%] flex  items-center justify-cente italic w-full'>
       <MarqueeX numbers={6} speed={speed1}  className='border-none bg-gree-600' >
        <h2 className=' font-custom italic flex items-center justify-center gap-4
         uppercase bgemerald-700 text-brand-white text-[clamp(4em,_6vw,_7em)]'>
          {curiosity}
           <img src='/images/crypto/bitcoin.svg' className='w-10 h-10'/>
          </h2>
        </MarqueeX>
      </motion.div>
      <motion.div animate={control} variants={carden} custom={2}
       className='[perspective:_1000px] flex w-full
        items-center h-inhe  [backface-visibility:hidden]  border-none bg-brand-secondary' >
      <MarqueeX speed={speed1} numbers={5}  >
        <h2 className='font-custom scale-y-[1.8] lg:scale-y-[1] font-bold flex items-center justify-center gap-4 uppercase
         bgemerald-700 text-brand-black text-heading leading-[1.5]'> 
          {hook}
          <motion.svg animate={{rotate:360}} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}  className='w-[.8em] h-[.6em]' viewBox="0 0 125 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M107.834 81.9065L94.7659 55.331C94.0992 53.9597 95.3659 52.4579 96.8327 52.7844L103.233 54.2209C104.233 54.4168 105.233 53.8291 105.433 52.8497L107.367 44.6877C107.567 43.7082 106.967 42.7288 105.967 42.5329L76.5646 35.938C75.0311 35.6115 74.6311 33.7179 75.8312 32.7385L80.9649 28.7554C81.7649 28.1025 81.8983 26.9924 81.2316 26.2089L75.8978 19.6793C75.2311 18.8957 74.0977 18.7651 73.2976 19.4181L49.7625 37.8316C48.5625 38.811 46.7623 37.9622 46.7623 36.3951V29.9308C46.7623 28.9513 45.9623 28.1025 44.8955 28.1025H36.3616C35.3615 28.1025 34.4947 28.886 34.4947 29.9308V59.4446C34.4947 60.9464 32.6946 61.7953 31.4945 60.8811L26.3608 56.8981C25.5608 56.2451 24.4273 56.3757 23.7606 57.1592L18.4269 63.6889C17.7602 64.4724 17.8935 65.5824 18.6936 66.2354L42.2287 84.6489C43.4288 85.6284 43.0287 87.5219 41.4953 87.8484L35.0948 89.2849C34.0947 89.4808 33.4947 90.4603 33.6947 91.4397L35.6282 99.6017C35.8282 100.581 36.8283 101.169 37.8283 100.973L67.2305 94.378C68.764 94.0515 69.9641 95.5534 69.2973 96.9246L66.4305 102.736C65.9638 103.65 66.3638 104.695 67.2972 105.152L75.0311 108.808C75.9645 109.266 77.0312 108.874 77.498 107.96L90.5656 81.3841C91.2323 80.0129 93.2325 80.0129 93.8992 81.3841L96.766 87.1955C97.2327 88.1096 98.2995 88.5014 99.2329 88.0443L106.967 84.3877C107.9 83.8654 108.234 82.8206 107.834 81.9065ZM80.4315 74.2015L73.3643 88.632C72.6309 90.1991 70.2974 89.9379 69.8974 88.2402L68.764 83.5389C68.5639 82.5594 67.5639 81.9718 66.5638 82.1677L50.6293 85.7589C48.8958 86.1507 47.6957 84.1918 48.7625 82.8859L51.8294 79.0987C52.4961 78.3152 52.3627 77.2052 51.5627 76.5522L38.7617 66.5619C37.3616 65.5171 38.1617 63.2971 39.8952 63.2971H44.8289C45.8289 63.2971 46.6956 62.5135 46.6956 61.4688V45.4712C46.6956 43.7735 48.8958 42.99 50.0292 44.3612L53.1628 48.0831C53.8295 48.8666 54.9629 48.9972 55.763 48.3443L68.4973 38.4193C69.8974 37.3745 71.8309 38.5498 71.4308 40.2475L70.2974 44.9489C70.0974 45.9283 70.6974 46.9077 71.6975 47.1036L87.632 50.6949C89.3655 51.0867 89.6322 53.3721 88.0321 54.0903L83.5651 56.1798C82.6317 56.6369 82.2316 57.6816 82.6983 58.5958L89.7655 73.0262C90.4989 74.5933 88.8988 76.2257 87.2987 75.4422L82.8317 73.3527C81.965 72.9609 80.8982 73.2874 80.4315 74.2015Z"
 fill="#262626"/>
</motion.svg>
           {/* <img src='/images/B1.svg' className='w-20 h-20'/> */}
          </h2>
        </MarqueeX>
      </motion.div>

        </motion.div>
    </div>

  </div>
  )
}

export default ScrollSplitMarquee