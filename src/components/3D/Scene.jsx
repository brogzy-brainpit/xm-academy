import React, { Suspense } from 'react'
import {Canvas} from '@react-three/fiber'
import { DirectionalLight } from 'three'
import Modal from './Modal'
import { useProgress,Html, ScrollControls } from '@react-three/drei'

function Loader() {
  const {active,progress}= useProgress()
return <Html center className='capitalize text-brand-text-dark font-custom text-footer'>{progress.toFixed(1)} % loading</Html>
}
  function Scene() {
  return (
   <Canvas gl={{antialias:true}} dpr={[1,1.5]} className='relative'>
    <directionalLight position={[-5,-5,5]} intensity={4} />
    <Suspense fallback={<Loader/>}>
     <ScrollControls damping={0.2} pages={2}>
    <Modal/>
     </ScrollControls>
    </Suspense>
   </Canvas>
  )
}

export default Scene