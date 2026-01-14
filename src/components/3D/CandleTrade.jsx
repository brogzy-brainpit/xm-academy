import { useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function CryptoCandleScene({ className = "" }) {
  function ShaderPlane() {
    const { viewport, size } = useThree();

    const material = useMemo(() => {
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 },
          iResolution: {
            value: new THREE.Vector3(size.width, size.height, 1),
          },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;

          uniform float iTime;
          uniform vec3 iResolution;
          varying vec2 vUv;

          // --- Helper functions ---
          float curve(in vec2 p, in float fy, in float minLimit, in float maxLimit) {
            if(p.x < minLimit) return 0.;
            if(p.x > maxLimit) return 0.;
            float d = 1. - 150.*abs(p.y - fy);
            return clamp(d, 0., 1.);
          }

          float nSin(in float t) {
            return 0.5 + 0.5 * sin(t);
          }

          float glowingPoint(in vec2 uv, in vec2 pos, in float size) {
            float dist = distance(uv,pos);
            float d = (1. - (1./(1.*size))*dist);
            d = clamp(d, 0., 1.);
            return sqrt(sqrt(d));
          }

          float speed = 0.15;
          float trend = 1.5;

          float stockFunction(in float x) {
            float t = x + iTime * speed;
            float f0 = 6.28; float f1 = 3.68; float f2 = 13.28;
            float f3 = 32.43; float f4 = 123.; float f5 = 331.;
            float f6 = 730.; float f7 = 1232.;
            float wave = sin(f0*t)*0.4 + sin(f1*t)*0.2 + sin(f2*t)*0.1 + cos(f3*t)*0.15 +
                         sin(f4*t)*0.1 + sin(f5*t)*0.05 + sin(f6*t)*0.035 + sin(f7*t)*0.02;
            float modf = mod(sin(f1*t)*sin(f2*t),0.1)*(5.*sqrt(nSin(f0*t)));
            return (-trend/1.5 + trend*x - 0.5*(wave+modf))/5.;
          }

          float d_stockFunction(in float x, in float delta) {
            return (stockFunction(x-delta) - stockFunction(x))/delta;
          }

          float longTrend(in float x) {
            return (d_stockFunction(x,0.025)+d_stockFunction(x,0.05)+d_stockFunction(x,0.1))/3.;
          }

          float shortTrend(in float x) {
            return (d_stockFunction(x,0.004)+d_stockFunction(x,0.005)+d_stockFunction(x,0.006))/3.;
          }

          vec3 trendColor(in float trend) {
            vec3 red = vec3(1.,0.,0.);
            vec3 green = vec3(0.,1.,0.);
            trend *= 100.;
            trend = atan(trend)/(1.57079632679);
            trend = (trend+1.)/2.;
            return mix(green, red, trend);
          }

          float grid(in vec2 uv, float tileSize, float borderSize) {
            float xMod = mod(uv.x, tileSize);
            float yMod = mod(uv.y, tileSize);
            return (xMod<borderSize||yMod<borderSize)?1.:0.;
          }

          void main() {
            vec2 uv = vUv;
            uv.y -= 0.33;

            vec3 points = vec3(0.);
            float size = 0.025;
            float start = 0.9;
            float end = 0.85;
            float delta = end-start;

            for(float offset=0.; offset<1.; offset+=0.05) {
              float pos = start + delta*offset;
              vec3 pColor = glowingPoint(uv, vec2(pos, stockFunction(pos)), size)*trendColor(longTrend(pos));
              points = max(points,pColor);
              size *= 0.92;
            }

            vec3 line = trendColor(shortTrend(uv.x))*curve(uv, stockFunction(uv.x),0.,start);
            vec2 gridOffset = vec2(iTime*speed, iTime*speed*trend/5.);
            vec3 background = vec3(1.,1.,1.)*grid(uv+gridOffset,0.2,0.002);
            vec3 color = max(line, points)+background*0.05;

            gl_FragColor = vec4(color,1.);
          }
        `,
      });
      return mat;
    }, [size]);

    useFrame(({ clock }) => {
      material.uniforms.iTime.value = clock.elapsedTime;
    });

    return (
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <primitive object={material} attach="material" />
      </mesh>
    );
  }

  return (
    <div className={`w-[600vw] h-[600vh]  ${className}`}>
      <Canvas>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
