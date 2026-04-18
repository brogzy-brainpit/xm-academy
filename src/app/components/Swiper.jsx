'use client'

import React, { useRef, useEffect } from 'react'
import Core from 'smooothy'
import Section from '../layout/Section';
import GridColumn from '../layout/GridColumn';
import SlideUpText from '../effects/SlideUpText';

const slidesData = [
  {
    text: "XM Trading Academy not only improved my trading but also opened up career opportunities in the crypto industry. Thank you, Ahmed, for this incredible journey.",
    username: "Micheal Ogochukwu",
    color: "#FFFF00",
  },
  {
    text: "I've been a part of XM Trading Academy Signal Group for over 7 months now, and I must say it has been an exceptional learning experience. This academy has truly transformed my approach to trading.",
    username: "Yusuf Anka",
    color: "#55DB9C",
  },
  {
    text: "I cannot emphasize enough how invaluable the signals at XM Trading Academy have been for me. The coaching sessions provided me with personalized guidance that significantly improved my trading skills. I feel much more confident in my decisions now.",
    username: "Asmau Abdullahi",
    color: "#E9CCFF",
  },
  {
    text: "A knowledgeable and supportive community of traders. The trading community here is always ready to share insights and strategies. It's a fantastic place to network and grow as a trader.",
    username: "Joseph John",
    color: "#FB4903",
  },
  {
    text: "Joining XM Trading Academy was one of the best decisions I've made. The structured lessons and real-time market insights helped me become more disciplined and consistent in my trades.",
    username: "Ibrahim Musa",
    color: "#FFFFFF",
  },
  {
    text: "The mentorship here is top-notch. Ahmed and the team break down complex trading concepts into something anyone can understand, even as a beginner.",
    username: "Zainab Bello",
    color: "#4DA2FF",
  },
  {
    text: "Before joining, I struggled with losses and confusion. Now I trade with a clear strategy and confidence thanks to XM Trading Academy.",
    username: "Sadiq Mohammed",
    color: "#FFB347",
  },
  {
    text: "What stands out the most is the consistency of the signals and the support from the community. You’re never alone in your trading journey here.",
    username: "Fatima Usman",
    color: "#E9CCFF",
  },
  {
    text: "XM Trading Academy gave me the foundation I needed to take trading seriously. It’s more than just signals — it’s real education.",
    username: "Abdulrahman Aliyu",
    color: "#FB4903",
  },
  {
    text: "The environment is motivating and growth-focused. Being surrounded by traders who are serious about improving pushes you to do better every day.",
    username: "Maryam Sani",
    color: "#55DB9C",
  },
];

const Swiper = () => {

  const wrapperRef = useRef(null);

  useEffect(()=>{
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const slides = [...wrapper.children];

    const preventSelect = (e) => e.preventDefault();
    wrapper.addEventListener('selectstart', preventSelect);
    wrapper.style.userSelect = 'none';
    wrapper.style.webkitUserSelect = 'none';
    wrapper.style.touchAction = 'pan-y';


    const slider = new Core(wrapper, {
      infinite: false,
      snap: false,
      variableWidth: true,
      lerpFactor: 0.02,
      speedDecay: 0.97,
      bounceLimit: 0,
      setOffset: ({ itemWidth, totalWidth}) =>{
        const gap = window.innerWidth * 0.02;
        const lastSlideOffset = (slidesData.length -1) * (itemWidth + gap);
        return totalWidth - lastSlideOffset;
      },
      onUpdate: (instance)=>{
        const vwOffset = window.innerWidth * .1

        slides.forEach((slide, i)=>{
          const slideWidth = slide.offsetWidth;
          const slideLeft = slide.offsetLeft + instance.current;
          const bgColor = slidesData[i].color;

          const isLast = i === slidesData.length -1;

          if (slideLeft < 0 && !isLast){
            const ratio = Math.min(1, Math.abs(slideLeft) / slideWidth);
            slide.style.cssText = `
              background-color: ${bgColor};
              border: 2px solid rgba(0,0,0,0.6);
              transform-origin: left 80%;
              transform: translateX(${instance.current + Math.abs(slideLeft) + ratio * vwOffset}px) rotate(${-15 * ratio}deg) scale(${1 - ratio * 0.4});
              position: relative;
              z-index: ${i + 1};
            `
          } else {
            slide.style.cssText = `
              background-color: ${bgColor};
              border: 2px solid rgba(0, 0, 0, 0.6);
              transform: translateX(${instance.current}px);
              z-index: ${i + 1};
            `
          }
        })
      }
    })

    let animId;
    let wasDragging = false;
    let momentum = 0;
    const MOMENTUM_MULTIPLIER = 10;
    const MOMENTUM_DECAY = 0.96;

    function animate (){
      slider.update();

      if (slider.isDragging) {
        wasDragging = true;
        momentum = 0;
      } else if (wasDragging) {
        momentum = slider.speed * MOMENTUM_MULTIPLIER;
        wasDragging = false;
        
      }
      if ( Math.abs(momentum) > .5) {
        slider.target += momentum;
        momentum *= MOMENTUM_DECAY;
        slider.target = Math.max(slider.maxScroll, Math.min(0,slider.target));
      }

      animId = requestAnimationFrame(animate);
    }

    animate();

    return ()=>{
      cancelAnimationFrame(animId);
      wrapper.removeEventListener('selectstart', preventSelect);
      slider.destroy();
    }
  }, [])


  return (
    <div className='min-h-screen '>
      <Section >
        <GridColumn>
      <div className='  col-span-full lg:col-span-4  h-full flex flex-col items-start justify-center'>
        <h2 className='text-heading text-left text-black font-custom  leading-[.8]'>
      <SlideUpText once={false} preLoaderOut text={'From'}/>
             </h2>
        <h2 className='text-heading text-left text-black font-custom  leading-[.8]'>
      <SlideUpText once={false} preLoaderOut text={'Our Students'}/>
      </h2>
        <p className='text-para font-body font-medium text-black mt-[4vw] w-[90%]'>
           <SlideUpText once={false} delay={.002} preLoaderOut
              text='Real experiences from students who have transformed their trading skills, built confidence, and taken steps toward financial independence through our academy.' 
               />
          </p>
      </div>

      <div className='col-span-full lg:col-start-5 lgcol-span-4 h-full overflow-clip relative'>
        <div ref={wrapperRef} className="cursor-[url('https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68384fb014875f192dfcef4b_cursor-drag.svg'),_grab] flex h-full items-center will-change-transform">
          {slidesData.map((slide, index) => {
            return <div
              key={index}
              className={`shrink-0 pointer-events-none  w-[16em] h-[25em] lg:w-[20em] lg:h-[30em] rounded-[2vw] flex flex-col justify-between p-[2vw] ${index < slidesData.length -1 ? 'mr-[1vw]' : ''}`}
              style={{
                backgroundColor: slide.color,
                border: '2px solid rgba(0, 0, 0, 0.6)'
              }}
            >
              <p className='text-para font-body font-medium leading-tight text-brand-black'>{slide.text}</p>
              <p className='text-heading3 font-custom font-bold tracking-[.08em] text-brand-black'>{slide.username}</p>
            </div>
          })}
        </div>
      </div>
        </GridColumn>
      </Section>
    </div>
  )
}

export default Swiper