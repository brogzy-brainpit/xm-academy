import SlideUpText from '@/app/effects/SlideUpText'
import React from 'react'
import CustomBtn from './CustomBtn'
import CustomArrow from './CustomArrow'
import { Facebook, FacebookIcon, Instagram, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'

function footer() {
  const texts=[
    {text:'aircraft maintainanc',
      url:'#',background:'pink'
    }, {text:' maintainance & tracking',
      url:'#',background:'#059669'
    }, {text:'aircraft & tracking',
      url:'#',background:'orange'
    }
  ]
  return (
    <div className='bg-brand-secondary w-full relative  flex gap-2 flex-col '>

      <section className=' relative mt-4 w-full h-full gap-6 container-section container mx-auto'>

  <div className="flex gap-2 breaker my-6 ">
  {/* Right side - single 50% item */}
  <div className="breaker-child  px-4  items-start justify-end md:justify-start flex   w-[68%]  ">
         <SlideUpText duration={0.5} delay={0.04} className=' text-white circular font-bold text-[20px] md:text-[30px] leading-[40px] uppercase' text={'hello@domain.com'}/>  
          </div>
            <div className="breaker-child px-4  items-start justify-end flex w-[68%]  ">
         <SlideUpText duration={0.5} delay={0.04} className=' text-white circular font-bold text-[20px] md:text-[30px] leading-[40px] uppercase' text={'+(234)9063260237'}/>  
          </div>
          
        

</div>

 <div className="  p-4 grid grid-cols-1 md:grid-cols-3 gap-2  w-full mdw-[50%]">
  {/* Left side - stacked items */}
       {/* <div className={`w-full  items-start gap-2 flex flex-col`}> */}
            <div className={`w-full  -4 rounded-2xl items-end md:items-start justify-between flex gap-[4px] flex-col`}>
         
         <p  className=' text-white font-body  text-para  leading-para'>general Streen 45-FB</p>
         <p  className=' text-white font-body  text-para  leading-para'>1017 MT Kaduna</p>
         <p  className=' text-white font-body  text-para  leading-para'>Nigeria</p>
          </div>

          <div className={`w-full  -4 rounded-2xl items-end md:items-center justify-between flex gap-[2px] flex-col  borde border-brand-accent`}>

         <p  className=' text-white circular font-bold text-para  leading-pa3a uppercase'> Let's talk</p>
         <p  className=' text-white font-body  text-para  leading-para'> email@domain.com</p>

          </div>
            <div className={`w-full items-end justify-between flex gap-[4px] flex-col`}>
         
         <p  className=' text-white circular font-bold  text-para  leading-p3ra uppercase'>Policies</p>
         <p  className=' text-white font-body  text-para  leading-para'>Privacy policy</p>
         <p  className=' text-white font-body  text-para  leading-para'>Terms and conditions
         </p>

          </div>
  
         
          
  </div>


<div className='relative overflow-hidden'>
   <h1
  className="text-center font-bold circular text-display leading-[1] md:leading-[0.7] tracking-[-8px] text-white"
>
  alfred
</h1>
  <div className=" absolute bottom-0 bg-brand-secondary py-4 md:py-[50px] flex gap-2  w-full ">
  {/* Left side - stacked items */}
       <div className={`w-full  items-start gap-2 flex`}>
         
         <p  className=' text-white font-body  text-para  leading-para uppercase'><FacebookIcon className='w-4 h-4'/></p>
         <p  className=' text-white font-body  text-para  leading-para uppercase'><Linkedin className='w-4 h-4'/></p>
         <p  className=' text-white font-body  text-para  leading-para uppercase'><Instagram className='w-4 h-4'/></p>
       

          </div>
            <div className={`w-full items-center justify-end flex`}>
         
         <p  className=' text-white font-body  text-para  leading-para capitalize'>code by memet </p>

          </div>
  
         
          
  </div>
</div>
   




 
      
      </section>
      </div>
  )
}

export default footer