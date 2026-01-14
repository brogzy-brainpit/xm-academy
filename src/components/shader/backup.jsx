import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function Scene() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  const mouseRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", handleResize);

    const handleMouse = (e) => {
      mouseRef.current = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  const GlassPlane = () => {
    const texture = useLoader(THREE.TextureLoader, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVp5mLuaiuCu9wb1k8TSWPKAvijEuRI2VEuQ&s");
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iChannel0: { value: texture },
        // iResolution: { value: [size[0], size[1], 1] },
        iTime: { value: 0 },
        mouse: { value: [0, 0] },
      },
      fragmentShader: `
        const float NUM_STRIPES = 50.0;
        const float STRRENGTH = 18.0;
        const float SOFTNESS = 0.0005;
        uniform sampler2D iChannel0;
        uniform vec3 iResolution;
        uniform float iTime;
        uniform vec2 mouse;
        varying vec2 vUv;

        float displacement(float x,float num_stripes,float strength){
          float modulus = 1.0 / num_stripes;
          return mod(x, modulus) * strength;
        }

        float fractal_glass(float x){
          float d = 0.0;
          for(int i=-5;i<=5;i++){
            d += displacement(x + float(i)*SOFTNESS, NUM_STRIPES, STRRENGTH);
          }
          return d / 11.0;
        }

      void main(){
  vec2 uv = vUv;

  float distort = fractal_glass(uv.x);

  vec2 imgUv = uv;

  // move image UP
  // imgUv.y += 0.15;

  // imgUv.x += distort * 0.1;
  // imgUv.x += mouse.x * 0.03;

    // move image UP
  imgUv.y += 0.10;

  imgUv.x += distort * 0.2;
  imgUv.x += mouse.x * 0.04;

  vec3 col = texture2D(iChannel0, imgUv).rgb;
  gl_FragColor = vec4(col,1.0);
}

      `,
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
        }
      `,
    });

    useFrame((state) => {
      material.uniforms.mouse.value[0] = THREE.MathUtils.lerp(
        material.uniforms.mouse.value[0],
        mouseRef.current,
        0.1
      );
    });

    return (
      <mesh material={material} scale={[18, 8, 0]}>
        <planeGeometry args={[1, 1]} />
      </mesh>
    );
  };

  return (
    <div className="overflow-hidden w-full h-svh">
      <Canvas>
        <GlassPlane />
      </Canvas>
    </div>
  );
}
