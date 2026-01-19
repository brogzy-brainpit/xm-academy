'use client';
import { useEffect, useState } from 'react';
import Lenis from '@/app/components/Lenis';
import Landing from './components/Landing';
import Preloader from './components/Preloader';
import Preloader2 from './components/Preloader2';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ScrollSplitMarquee from './components/ScrollSplitMarquee';
import dynamic from 'next/dynamic';
const Scene = dynamic(() => import("./components/shader/Scene"), {
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
        <Scene/>
        
    </Lenis>
    </main>
  );
}
