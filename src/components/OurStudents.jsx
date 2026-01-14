import React, { useEffect, useRef, useState } from 'react'
import {animate,  motion, useInView, useMotionValue, useTransform} from 'framer-motion'
import Section from '@/app/layout/Section'
import GridColumn from '@/app/layout/GridColumn'
import SlideUpText from '@/app/effects/SlideUpText'

function OurStudents({preLoaderOut}) {
    const Container =useRef(null)
    const inView= useInView(Container,{margin:'100px'})
    const studentNumbers= useMotionValue(0)
    const normalizedStudent= useTransform(studentNumbers,(v)=>Math.floor(v))
    const [finishedSvgMorph,setFinishedSvgMorph]=useState(false)
    useEffect(()=>{
if(inView){
    studentNumbers.set(0)
         animate(studentNumbers,358,{duration:4.5,ease:'linear',onComplete:()=>setFinishedSvgMorph(true)})
}
    },[inView])
    const circle= {
        initial:{
            strokeDashoffset:500,
            strokeDasharray:"0 700",
        },
         enter:{
            strokeDashoffset:0,
            strokeDasharray:"2.5 2.5",
            transition:{
                duration:4.5,
                ease:'linear'
            }
        },
    }
  return (
    <div ref={Container} className='h-svh w-full bg-black  '>
        <Section padding={false} className={'px-5'}>
            <GridColumn>

        <div className='col-span-4 lg:col-span-4 relative bg-purpl700 flex items-cente justify-center '>
            <motion.div className= ' flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white  font-custom'>
           <span>
             <motion.span className='text-heading'>
            {normalizedStudent}
                </motion.span>             
       <span className='text-heading'>+</span>
           </span>
            <span className='text-para font-body text-white '>
                <SlideUpText text={'students graduated'} preLoaderOut={finishedSvgMorph}/>
            </span>
            </motion.div>
        <motion.svg
        className={'bg-red800 w-[100%] h-[350px]'}
         animate={{rotate:-180}} 
         transition={{duration: 30, repeat: Infinity, ease: "linear" }}
          
        viewBox="50 50 300 300"
        width="100%" 
         fill="none" xmlns="http://www.w3.org/2000/svg">
{/* <motion.circle
 cx="200" cy="200" r="127" stroke="white" stroke-width="20" stroke-dasharray="2 10"/> */}
<motion.circle variants={circle} initial='initial' animate={inView?'enter':'initial'}
  cx="200" cy="200" r="127" stroke="white" strokeWidth="6" />
</motion.svg>

        </div>
            </GridColumn>
        </Section>
        

        
        </div>
  )
}

export default OurStudents