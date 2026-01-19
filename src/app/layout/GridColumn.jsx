import React from "react";
import clsx from "clsx";

function GridColumn({ children,gridLines=false, className }) {
  return (
 <div className="h-full w-full relative">
    <div
      className={clsx(
        "grid  grid-cols-6 lg:grid-cols-12 gap-[1.25em] lg:gap-[1.5em]",
        className
      )}
    >
      {children}
    </div>
      {gridLines && 
      
       <div
      className={clsx(
        "grid h-full w-full absolute top-0 left-0 grid-cols-6 lg:grid-cols-12 gap-[1.25em] lg:gap-[1.5em]",
        className
      )}
    >
      <div className="col-span-1 h-full bg-slate-600/20">dd</div>
      <div className="col-span-1 h-full bg-slate-600/20">aa</div>
      <div className="col-span-1 h-full bg-slate-600/20"></div>
      <div className="col-span-1 h-full bg-slate-600/20"></div>
      <div className="col-span-1 h-full bg-slate-600/20"></div>
      <div className="col-span-1 h-full bg-slate-600/20"></div>
      <div className="col-span-1 h-full lg:block hidden bg-slate-600/20"></div>
      <div className="col-span-1 h-full lg:block hidden bg-slate-600/20"></div>
      <div className="col-span-1 h-full lg:block hidden bg-slate-600/20"></div>
      <div className="col-span-1 h-full lg:block hidden bg-slate-600/20"></div>
      <div className="col-span-1 h-full lg:block hidden bg-slate-600/20"></div>
      <div className="col-span-1 h-full lg:block hidden bg-slate-600/20"></div>
    </div>
     
    
    }
 </div>
  );
}

export default GridColumn;
