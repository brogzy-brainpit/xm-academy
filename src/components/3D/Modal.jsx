import React, { useEffect, useRef } from 'react'
import {Group} from 'three'
import {useAnimations, useGLTF} from '@react-three/drei'
import { act } from '@react-three/fiber'
useGLTF.preload('/plane.glb')
function Modal() {
    const group=useRef(Group)
const{nodes,materials,animations,scene}= useGLTF('/plane.glb')
const {actions,clips} = useAnimations(animations,scene)
useEffect(()=>{
    console.log(actions)

})
  return (
    <group ref={group}>
        <primitive object={scene}/>
    </group>
  )
}

export default Modal