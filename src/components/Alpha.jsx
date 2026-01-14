import SlideUpText from '@/app/effects/SlideUpText'
import React from 'react'
import CustomBtn from './CustomBtn'
import Image from 'next/image'
import ScaleUpContent from '@/app/effects/ScaleUpContent'
import FlipTextEffect from '@/app/effects/FlipTextEffect'

function Alpha() {
  const texts=[
    {text:'aircraft maintainanc',
      url:'#'
    }, {text:' maintainance & tracking',
      url:'#'
    }, {text:'aircraft & tracking',
      url:'#'
    }, {text:'tracking & aircraft',
      url:'#'
    },
  ]
  return (
    <div className=' w-full min-h[100vh] container-section container mx-auto    '>



      <section className='my-4 w-full h-full gap-6 bg-brand-accent rounded-2xl p-4'>
      
  <div className="flex gap-4 breaker justify-between">
  {/* Right side - single 50% item */}
  <div className="breaker-child   rounded-2xl items-start justify-end flex gap-4 flex-col  w-[60%] ">
    <p className='font-body text-xs '>Lorem, ipsum dolor.</p>
         <SlideUpText margin='-120px' duration={0.5} delay={0.04} className=' text-neutral-900 bebas text-footer leading-footer uppercase' text={'aircraft maintainance & tracking'}/>  

       <CustomBtn>
     <FlipTextEffect className='text-white'  text='click me'/>
        
       </CustomBtn>
          </div>

           <div className="breaker-child flex gap-4 flex-col justify-end items-end w-[40%]">
        <ScaleUpContent once={false} className='w-full h-[350px] md:h-[380px] overflow-hidden rounded-2xl '>
        <Image width={400} height={400} src={'/images/service01.png'} className='w-full h-full object-cover'/>
  
          </ScaleUpContent>          
          </div>
       

</div>

      </section>
      
      </div>
  )
}

export default Alpha