'use client'
import GridColumn from "@/app/layout/GridColumn";
import Section from "@/app/layout/Section";
import { useState } from "react";


function GridLines() {
const [toggleGrid,setToggleGrid]=useState(true)
  return (
    <div className='fixed z-[999999] h-svh top-0 w-full pointer-events-none '>
    <button onClick={()=>{setToggleGrid(!toggleGrid)}} className='text-white w-[100px] rounded-md p-4 m-4 bg-blue-600 font-body fixed z-[99999] top-0  pointer-events-auto '>
        show grid
      </button>

      {toggleGrid && 
      
        <Section padding={false} className={'px-5 h-full'}>
           <div
                 className={
                   "grid h-full w-full  top-0 left-0 grid-cols-6 lg:grid-cols-12 gap-[1.25em] lg:gap-[1.5em]"
                 }
               >
                 <div className="col-span-1 h-full bg-orange-600/40"></div>
                 <div className="col-span-1 h-full bg-orange-600/40"></div>
                 <div className="col-span-1 h-full bg-orange-600/40"></div>
                 <div className="col-span-1 h-full bg-orange-600/40"></div>
                 <div className="col-span-1 h-full bg-orange-600/40"></div>
                 <div className="col-span-1 h-full bg-orange-600/40"></div>
                 <div className="col-span-1 h-full lg:block hidden bg-orange-600/40"></div>
                 <div className="col-span-1 h-full lg:block hidden bg-orange-600/40"></div>
                 <div className="col-span-1 h-full lg:block hidden bg-orange-600/40"></div>
                 <div className="col-span-1 h-full lg:block hidden bg-orange-600/40"></div>
                 <div className="col-span-1 h-full lg:block hidden bg-orange-600/40"></div>
                 <div className="col-span-1 h-full lg:block hidden bg-orange-600/40"></div>
               </div>
        </Section>
      }
        </div>
  );
}

export default GridLines
