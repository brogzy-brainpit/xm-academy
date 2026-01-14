import { useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function BrandShaderScene({
  className = "",
  // 👇 Brand color in RGB (0–255)
  brandRGB = [16, 204, 148],
  colorMix = 0.95,
}) {
  function ShaderPlane() {
    const { viewport, size } = useThree();

    const material = useMemo(() => {
      const [r, g, b] = brandRGB.map((v) => v / 255);

      return new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 },
          iResolution: {
            value: new THREE.Vector3(size.width, size.height, 1),
          },

          // 🎨 Brand controls
          brandColor: { value: new THREE.Vector3(r, g, b) },
          colorMix: { value: colorMix },
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
          uniform vec3 brandColor;
          uniform float colorMix;

          varying vec2 vUv;

          void main() {
            // Rebuild Shadertoy fragCoord
            vec2 fragCoord = vUv * iResolution.xy;

            float mr = min(iResolution.x, iResolution.y);
            vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;

            float d = -iTime * 0.5;
            float a = 0.0;

            for (float i = 0.0; i < 8.0; ++i) {
              a += cos(i - d - a * uv.x);
              d += sin(uv.y * i + a);
            }

            d += iTime * 0.5;

            // --- Base procedural color ---
            vec3 col = vec3(
              cos(uv * vec2(d, a)) * 0.6 + 0.4,
              cos(a + d) * 0.5 + 0.5
            );

            col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);

            // --- Convert to grayscale ---
            float luma = dot(col, vec3(0.299, 0.587, 0.114));
            vec3 gray = vec3(luma);

            // --- Apply brand color ---
            vec3 branded = gray * brandColor;

            // --- Mix strength ---
            col = mix(gray, branded, colorMix);

            // --- Final safety ---
            col = clamp(col, 0.0, 1.0);

            gl_FragColor = vec4(col, 1.0);
          }
        `,
      });
    }, [size, brandRGB, colorMix]);

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
    <div className={`w-full h-full overflow-hidden ${className}`}>
      <Canvas>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
