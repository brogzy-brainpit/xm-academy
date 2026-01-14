'use client';
import BrandsGrid from '@/components/BrandsGrid';
import Lenis from './effects/Scrolls/Lenis';
import CalModalInline from '@/components/CalModalInline';
import FAQS from '@/components/FAQS';
import Header from '@/components/Header';
import Landing from '@/components/Landing';
import Preloader from '@/components/Preloader';
import Preloader2 from '@/components/Preloader2';
import ScrollSplitMarquee from '@/components/ScrollSplitMarquee';
import { AnimatePresence } from 'framer-motion';
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
import OurStudents from '@/components/OurStudents';
import HorizontalTextWavy from '@/components/HorizontalTextWavy';
import { SwipeableCards } from '@/components/SwipeableCards';

const Scene = dynamic(() => import("../components/shader/Scene"), {
  ssr: false,
});


export default function Home() {

   const [isLoading,setIsLoading]=useState(true)
   const [preLoaderOut,setPreLoaderOut]=useState(false)
   const [isLoading2,setIsLoading2]=useState(true)


useEffect(()=>{

   const timer=  setTimeout(() => {
    setIsLoading(false)
    document.body.style.cursor="default"
    window.scrollTo({top:0})
    setPreLoaderOut(true)
    setTimeout(() => {
      setIsLoading2(false)
    }, 1000);

    }, 6000);
    return ()=>clearTimeout(timer)
  },[])
  return (
    <main>
      <Lenis>

         <AnimatePresence  mode="wait" onExitComplete={()=>{setPreLoaderOut(true)}}>
    {isLoading &&  <Preloader2 key={'preloader'}/>}
     {/* <Preloader key={'preloader'}/> */}
    </AnimatePresence>
    <AnimatePresence mode="wait">
  {isLoading2 ? (
    <Preloader key="pre" />
  ) : (
    <Header key="head" preLoaderOut={preLoaderOut} />
  )}
</AnimatePresence>
        <Landing preLoaderOut={preLoaderOut}/>
        <ScrollSplitMarquee/>
        <Scene />
        <SwipeableCards/>
        <HorizontalTextWavy/>
<OurStudents preLoaderOut={preLoaderOut}/>
        <BrandsGrid/>
        <FAQS/>
        {/* <div className='relative h-svh bg-black bg-bl w-full py-[2em] lg:px-5 px-[4px] flex items-center justify-center overflow-hidden'>
        </div> */}
        <CalModalInline />
      {/* <Footer />  */}
    </Lenis>
    </main>
  );
}
