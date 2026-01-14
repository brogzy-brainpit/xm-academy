'use client';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useScroll, useTransform, motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

function Zoom() {
  const container = useRef(null);
  const trackZoom = useRef(null);
  const videoRefs = useRef([]); // store refs for all videos
 const isZoomInView = useInView(trackZoom, { amount: 0.5, once: false });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src:'/videos/hero.mp4',
      scale: scale4,
      type: 'video',
      muted:false
    },
    {
      src: '/videos/hero.mp4',
      scale: scale5,
      type: 'video',
      muted:true
    },
    {
      src: '/videos/hero.mp4',
      scale: scale6,
      type: 'video',
      muted:true
    },
    {
      src: '/videos/hero.mp4',
      scale: scale5,
      type: 'video',
      muted:true
    },
    {
       src: '/videos/hero.mp4',
      scale: scale6,
      type: 'video',
      muted:true
    },
    {
      src: '/videos/hero.mp4',
      scale: scale8,
      type: 'video',
      muted:true
    },
    {
      src: '/videos/hero.mp4',
      scale: scale9,
      type: 'video',
      muted:true
    },
  ];

  // ✅ Control videos depending on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
        console.log(latest)
        console.log(isZoomInView)
      videoRefs.current.forEach((video) => {
        if (!video) return;
        if (isZoomInView && latest >= 0 && latest <= 0.999999999915879) {
          if (video.paused) {
            video.play().catch(() => {}); // silent catch for autoplay restrictions
          }
        } else {
          if (!video.paused) {
            video.pause();
            video.currentTime = 0; // optional reset
          }
        }
      });
    });

    return () => unsubscribe();
  }, [scrollYProgress,isZoomInView]);

  return (
    <div ref={container} className={styles.container}>
      <div ref={trackZoom} className={styles.sticky}>
        {pictures.map(({ src, scale, type,muted }, index) => (
          <motion.div key={index} style={{ scale }} className={styles.el}>
            <div className={styles.imageContainer}>
              {type === 'video' ? (
               <div className='w-full h-full relative'>
                 <video
                  ref={(el) => (videoRefs.current[index] = el)} // ✅ store ref
                  muted={muted}
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                >
                  <source src={src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
               </div>
              ) : (
                <Image src={src} fill alt="image" placeholder="blur" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
export default Zoom;
