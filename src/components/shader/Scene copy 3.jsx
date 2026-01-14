import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function BrandShaderScene({
  className = "",
  brandRGB = [16, 204, 148],
  colorMix = 0.95,

  // 🖌️ Brush controls
  brushSize = 0.1,
  brushStrength = 0.8,
  brushDecay = 0.96,
}) {
  function ShaderPlane() {
    const { viewport, size, gl } = useThree();

    const mouse = useRef(new THREE.Vector2(-10, -10));
    const lastMouse = useRef(new THREE.Vector2(-10, -10));
    const isPainting = useRef(false);

    // --- Ping-pong FBOs
    const rtA = useRef(new THREE.WebGLRenderTarget(size.width, size.height));
    const rtB = useRef(new THREE.WebGLRenderTarget(size.width, size.height));
    const swap = useRef(false);

    // --- Mouse tracking
    useEffect(() => {
      const move = (e) => {
        mouse.current.set(e.clientX / size.width, 1.0 - e.clientY / size.height);
        isPainting.current = true;
      };
      const up = () => {
        isPainting.current = false;
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
      window.addEventListener("mouseleave", up);
      return () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
        window.removeEventListener("mouseleave", up);
      };
    }, [size]);

    // --- Brush material (writes into FBO)
    const brushMaterial = useMemo(
      () =>
        new THREE.ShaderMaterial({
          uniforms: {
            prevTex: { value: null },
            mouse: { value: mouse.current },
            size: { value: brushSize },
            strength: { value: brushStrength },
            decay: { value: brushDecay },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = vec4(position,1.0);
            }
          `,
          fragmentShader: `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2D prevTex;
            uniform vec2 mouse;
            uniform float size;
            uniform float strength;
            uniform float decay;

            void main() {
              vec2 px = vec2(1.0)/vec2(textureSize(prevTex,0));
              vec3 prev = texture2D(prevTex,vUv).rgb;
              // simple diffusion
              prev += texture2D(prevTex, vUv + vec2(px.x,0)).rgb;
              prev += texture2D(prevTex, vUv - vec2(px.x,0)).rgb;
              prev += texture2D(prevTex, vUv + vec2(0,px.y)).rgb;
              prev += texture2D(prevTex, vUv - vec2(0,px.y)).rgb;
              prev /= 5.0;
              prev *= decay;

              float d = distance(vUv, mouse);
              float m = smoothstep(size, 0.0, d);
              vec3 brush = vec3(m * strength);
              gl_FragColor = vec4(prev + brush,1.0);
            }
          `,
        }),
      []
    );

    // --- Main shader (your original + brush blend)
    const material = useMemo(() => {
      const [r, g, b] = brandRGB.map((v) => v / 255);
      return new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector3(size.width, size.height, 1) },
          brandColor: { value: new THREE.Vector3(r, g, b) },
          colorMix: { value: colorMix },
          brushTex: { value: rtA.current.texture },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
        `,
        fragmentShader: `
          precision highp float;
          uniform float iTime;
          uniform vec3 iResolution;
          uniform vec3 brandColor;
          uniform float colorMix;
          uniform sampler2D brushTex;
          varying vec2 vUv;

          void main() {
            vec2 fragCoord = vUv * iResolution.xy;
            float mr = min(iResolution.x,iResolution.y);
            vec2 uv = (fragCoord*2.0 - iResolution.xy)/mr;

            float d=-iTime*0.5;
            float a=0.0;
            for(float i=0.; i<8.; i++){ a+=cos(i-d-a*uv.x); d+=sin(uv.y*i+a);}
            d+=iTime*0.5;

            vec3 col=vec3(cos(uv*vec2(d,a))*0.6+0.4, cos(a+d)*0.5+0.5);
            col=cos(col*cos(vec3(d,a,2.5))*0.5+0.5);

            float luma=dot(col, vec3(0.299,0.587,0.114));
            vec3 gray=vec3(luma);
            vec3 branded=gray*brandColor;
            col = mix(gray, branded, colorMix);

            float brush = texture2D(brushTex,vUv).r;
            col += brush*brandColor;

            gl_FragColor = vec4(clamp(col,0.0,1.0),1.0);
          }
        `,
      });
    }, [size, brandRGB, colorMix]);

    // --- Render loop
    useFrame(() => {
      material.uniforms.iTime.value += 0.01;

      // compute mouse lerp for smooth movement
      mouse.current.lerp(lastMouse.current, 0.2);
      lastMouse.current.copy(mouse.current);

      const read = swap.current ? rtA.current : rtB.current;
      const write = swap.current ? rtB.current : rtA.current;

      brushMaterial.uniforms.prevTex.value = read.texture;

      gl.setRenderTarget(write);
      gl.render(
        new THREE.Mesh(new THREE.PlaneGeometry(2,2), brushMaterial),
        new THREE.Camera()
      );
      gl.setRenderTarget(null);

      material.uniforms.brushTex.value = write.texture;
      swap.current = !swap.current;
    });

    return (
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <primitive object={material} attach="material" />
      </mesh>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
