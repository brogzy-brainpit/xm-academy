'use client';
import { useEffect, useState } from 'react';
import Lenis from '@/app/components/Lenis';
import Landing from './components/Landing';

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

        <Landing preLoaderOut={preLoaderOut}/>
        
    </Lenis>
    </main>
  );
}
