import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import {Environment,OrbitControls,ScrollControls,useGLTF, useTexture} from '@react-three/drei'
import { act, Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Box3, CylinderGeometry, MeshStandardMaterial, Vector3 } from 'three'
// import {TextureLoader} from 'three/src/loaders/TextureLoader'
import { useInView,useMotionValue,useScroll, useSpring, useTransform,animate } from 'framer-motion'
import Section from '@/app/layout/Section'
import GridColumn from '@/app/layout/GridColumn'
import SlideUpText from '@/app/effects/SlideUpText'
useGLTF.preload('/bitcoin.glb')
function Scene({className}) {
   const ref = useRef(null)
  const {scrollYProgress}= useScroll({target:ref,offset:['start start','end end']})
const progress= useTransform(scrollYProgress,[0,1],[0,10])
const smoothProgress =useSpring(progress,{stiffness:120,damping:30,mass:.2})
  const isInView = useInView(ref, { once: false, margin: '-20%' })
  return (
       <div ref={ref} className={`w-full h-[500vh]  relative `}>
        <div className='h-screen w-full sticky top-0'>

    <Canvas
    //  camera={{position:[0,2,100],fov:65}}
     style={{backgroundColor:'black',pointerEvents:'auto'}} >
    
    {/* <OrbitControls enablePan={false}  enableZoom={false}/> */}
      <ambientLight intensity={2}/>
      <directionalLight intensity={7} position={[0,4,20]}/>
      {/* <directionalLight intensity={60} position={[5,45,200]}/> */}
      <Environment files={'/hdri/warehouse.hdr'}/>
    <Modal isInView={isInView} progress={smoothProgress}/>

    </Canvas>
        </div>

        <div className='h-svh w-full'>
          <Section className={'h-full'}>
            <GridColumn className={'h-full'}>
              <div className="col-span-3 lg:col-span-5 h-full">
                <h2 className='font-custom  text-heading leading-[.8] text-white'>
                  <SlideUpText gap='.1em'  text={'Immersive Learning Experience'}/>
               {/* Immersive Learning Experience */}
                </h2>
              </div>
              <div className="col-start-3 lg:col-start-9 col-span-4 h-full flex items-end">
                <h2 className='font-body leading-[1.4] text-balance text-left text-para text-amber-100'>
                    <SlideUpText gap='.5em'  delay={.00099} 
                  text={'Transform your understanding of crypto with interactive lessons, hands-on-practice, and expert-led insights. We make complex concepts easy to understand, breaking down everything from blockchain fundamentals to advanced trading strategies.'}/>
                </h2>
              </div>
              </GridColumn>
          </Section>
        </div>
         <div className='h-svh w-full'>
          <Section className={'h-full'}>
            <GridColumn className={'h-full'}>
              <div className=" lg:col-start-9 col-span-4 h-full flex items-start">
                <h2 className='font-custom text-heading leading-[.8] text-white'>
                  {/* <SlideUpText once={false} text={'Innovating trading signals'}/> */}
                  <SlideUpText gap='.1em'  text={'Market-Ready Skills'}/>

                      {/* Market-Ready Skills */}
                </h2>
              </div>
              <div className="col-span-4 col-start-3 flex items-end lg:col-span-4 h-full">
                <h2 className='font-body leading-[1.4] text-balance text-left text-para text-amber-100'>
                    <SlideUpText gap='.5em'  delay={.00099} 
                  text={'From chart analysis to risk management, our curriculum covers the core startegies that professional traders use. Learn the secrets behind trading pairs, spot trends, and execute high-impact trades with confidence.'}/>
                </h2>
              </div>
              </GridColumn>
          </Section>
        </div>

        <div className='h-svh w-full'>
          <Section className={'h-full'}>
            <GridColumn className={'h-full'}>
              <div className="col-span-3 lg:col-span-5 h-full">
                <h2 className='font-custom  text-heading leading-[.8] text-white'>
                  {/* <SlideUpText once={false} text={'Innovating trading signals'}/> */}
                  <SlideUpText gap='.1em'  text={'Community of Traders'}/>
                  
                    {/* Community of Traders */}
                </h2>
              </div>
              <div className="col-start-3 lg:col-start-9 col-span-4 h-full flex items-end">
               <h2 className='font-body leading-[1.4] text-balance text-left text-para text-amber-100'>
                    <SlideUpText gap='.5em'  delay={.00099} 
                  text={"Learn alongside a supportive community of like-minded individuals. Access exclusive forums, live trading sessions, and mentorship from top-tier professionals. You'll never trade alone again."}/>
                </h2>
              </div>
              </GridColumn>
          </Section>
        </div>

         <div className='h-svh w-full'>
          <Section className={'h-full'}>
            <GridColumn className={'h-full'}>
              <div className=" lg:col-start-9 col-span-4 h-full flex items-start">
                <h2 className='font-custom text-heading leading-[.8] text-white'>
                <SlideUpText gap='.1em'  text={'Live Trading Labs'}/>
                      {/* Live Trading Labs */}
                </h2>
              </div>
              <div className="col-span-4 col-start-3 flex items-end lg:col-span-4 h-full">
                <h2 className='font-body leading-[1.4] text-balance text-left text-para text-amber-100'>
                    <SlideUpText gap='.5em'  delay={.00099} 
                  text={"Put your knowledge to the test in our Live Trading Labs. Experience the real-time volatility of the market with the guidance of industry experts. You'll analyze live charts, execute trades, and learn from the successes and mistakes of others."}/>
                </h2>
                
              </div>
              </GridColumn>
          </Section>
        </div>

       </div>
  )
}
const Modal = ({ isInView, progress }) => {
  const { scene } = useGLTF("/bitcoin.glb");
  const group = useRef();
  const model = useRef();
  const { viewport } = useThree();

  const scale = useMotionValue(0);
  const y = useMotionValue(-0.6);

  useEffect(() => {
    const targetScale =
      viewport.width > 8
        ? viewport.width * 0.0004
        : viewport.width * 0.0009;

    if (isInView) {
      animate(scale, targetScale, {
        duration: 1.3,
        ease: [0.16, 1, 0.3, 1],
      });

      animate(y, 0, {
        duration: 1.3,
        ease: [0.16, 1, 0.3, 1],
      });
    }
  }, [isInView, viewport.width]);

  useFrame(() => {
    if (!group.current || !model.current) return;

    group.current.scale.setScalar(scale.get());
    group.current.position.y = y.get();

    model.current.rotation.y = progress.get();
    model.current.rotation.z = progress.get();
  });

  return (
    <group ref={group}>
      <primitive ref={model} object={scene} />
    </group>
  );
};






















function NormalizedModel({children}){
const ref= useRef();
const {viewport}=useThree()
useLayoutEffect(()=>{
  if(!ref.current)return;
  const box= new Box3().setFromObject(ref.current);
  const size= new Vector3();
  box.getSize(size);
  const maxAsix= Math.max(size.x,size.y,size.z);
  ref.current.scale.setScalar(1/maxAsix);
},[viewport.width,ref.current])
return <group scale={viewport.width/80}  ref={ref}>
  {children}

</group>
}
export default Scene