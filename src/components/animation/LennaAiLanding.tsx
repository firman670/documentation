import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  Html,
  Float,
  Stars,
  MeshDistortMaterial,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  Vignette,
  SMAA,
} from "@react-three/postprocessing";
import { motion } from "framer-motion";
import HomepageFeatures from "../HomepageFeatures";

// =============================================
// Lenna.ai 3D Experience — smooth & lightweight
// Built with: React + TypeScript + three.js (@react-three/fiber)
// No external assets required (procedural textures/shaders)
// =============================================

// -------- Helper hooks
function useSpherePoints(count = 2000, radius = 6) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = radius * (0.7 + 0.3 * Math.random());
      positions[i * 3 + 0] = r * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);
    }
    return positions;
  }, [count, radius]);
}

// -------- Particles
const Particles: React.FC<{ count?: number; isDark?: boolean }> = ({
  count = 900,
  isDark = true,
}) => {
  const positions = useSpherePoints(count, 7);
  const ref = useRef<THREE.Points>(null!);
  const [hovered, setHovered] = useState(false);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 7 },
      uHover: { value: 0 },
      uColorA: {
        value: isDark ? new THREE.Color("#60a5fa") : new THREE.Color("#3b82f6"),
      },
      uColorB: {
        value: isDark ? new THREE.Color("#a78bfa") : new THREE.Color("#6366f1"),
      },
    }),
    [isDark]
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uHover.value += ((hovered ? 1 : 0) - uniforms.uHover.value) * 0.08;
  });

  return (
    <points
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      frustumCulled
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          uniform float uTime;
          uniform float uSize;
          uniform float uHover;
          varying float vPulse;
          void main() {
            vec3 pos = position;
            float pulse = sin(uTime * 2.0 + position.x * 3.1415) * 0.1;
            pos += normal * pulse;
            pos *= 1.0 + uHover * 0.3;
            vPulse = (pulse + 1.0) * 0.5;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = uSize * (1.0 / -mvPosition.z) * (1.0 + uHover);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColorA; 
          uniform vec3 uColorB; 
          varying float vPulse; 
          void main(){
            float d = length(gl_PointCoord - vec2(0.5));
            float alpha = smoothstep(0.5, 0.0, d);
            vec3 col = mix(uColorA, uColorB, vPulse);
            gl_FragColor = vec4(col, alpha * 0.9);
          }
        `}
        uniforms={uniforms}
      />
    </points>
  );
};

// -------- Network Orbs
const Orbs: React.FC<{ count?: number; isDark?: boolean }> = ({
  count = 200,
  isDark = true,
}) => {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      new Array(count).fill(0).map((_, i) => ({
        r: 2.5 + Math.random() * 6,
        sp: 0.2 + Math.random() * 0.8,
        off: Math.random() * Math.PI * 2,
        tilt: (Math.random() - 0.5) * 0.6,
        size: 0.02 + Math.random() * 0.05,
      })),
    [count]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    seeds.forEach((s, i) => {
      const a = t * s.sp + s.off;
      const x = Math.cos(a) * s.r;
      const y = Math.sin(a * 0.9) * s.r * s.tilt;
      const z = Math.sin(a) * s.r;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(s.size);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined as any, undefined as any, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={isDark ? "#818cf8" : "#4f46e5"} />
    </instancedMesh>
  );
};

// -------- Lenna.ai 3D Logo (Text)
const LennaLogo3D: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.25) * 0.15;
  });

  const textColor = isDark ? "#ffffff" : "#1e293b";
  const subTextColor = isDark ? "#cbd5e1" : "#475569";

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={group}>
        <Text
          fontSize={1.3}
          letterSpacing={0.02}
          position={[0, 0.1, 0]}
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          color={textColor}
        >
          Lenna.ai
          <MeshDistortMaterial
            factor={0.2}
            speed={2}
            side={THREE.DoubleSide}
            color={textColor}
          />
        </Text>

        <Text
          fontSize={0.35}
          position={[0, -0.9, 0]}
          anchorX="center"
          anchorY="middle"
          color={subTextColor}
        >
          Documentation
          <meshBasicMaterial side={THREE.DoubleSide} color={subTextColor} />
        </Text>
      </group>
    </Float>
  );
};

// -------- Scene wrapper
const Scene: React.FC = () => {
  const [theme, setTheme] = useState(
    typeof document !== "undefined"
      ? document.documentElement.dataset.theme
      : "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.dataset.theme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  const starsProps = useMemo(
    () => ({
      radius: 80,
      depth: 40,
      count: isDark ? 1200 : 1000,
      factor: isDark ? 4 : 4,
      fade: true,
      speed: 0.6,
      saturation: isDark ? 0 : 0,
      color: isDark ? "#ffffff" : "#C44B97",
    }),
    [isDark]
  );

  const ambientIntensity = isDark ? 0.2 : 0.8;
  const directionalIntensity = isDark ? 0.5 : 1.2;
  const glowColor = isDark ? "rgba(59,130,246,0.6)" : "rgba(96,165,250,0.4)";

  return (
    <>
      <Stars {...starsProps} />

      <Particles isDark={isDark} />

      <Orbs isDark={isDark} />

      <LennaLogo3D isDark={isDark} />

      <mesh rotation-x={-Math.PI / 2} position={[0, -1.2, 0]}>
        <circleGeometry args={[6, 64]} />
        <meshBasicMaterial
          map={useMemo(() => {
            const size = 256;
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = size;
            const ctx = canvas.getContext("2d")!;
            const grad = ctx.createRadialGradient(
              size / 2,
              size / 2,
              0,
              size / 2,
              size / 2,
              size / 2
            );
            grad.addColorStop(0, glowColor);
            grad.addColorStop(
              1,
              isDark ? "rgba(59,130,246,0.0)" : "rgba(96,165,250,0.0)"
            );
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, size, size);
            const t = new THREE.CanvasTexture(canvas);
            t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
            t.needsUpdate = true;
            return t;
          }, [glowColor, isDark])}
          transparent
        />
      </mesh>

      <EffectComposer>
        <SMAA />
        {isDark ? null : (
          <Bloom
            mipmapBlur
            intensity={isDark ? 0.8 : 0.3}
            luminanceThreshold={0.1}
            radius={0.9}
          />
        )}

        <Vignette eskil offset={0.2} darkness={isDark ? 0.6 : 0.1} />
      </EffectComposer>

      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={directionalIntensity}
        color={isDark ? "#ffffff" : "#f8fafc"}
      />

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={6}
        maxDistance={16}
      />
    </>
  );
};

// -------- UI Shell
export default function LennaAiLanding() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState(
    typeof document !== "undefined"
      ? document.documentElement.dataset.theme
      : "light"
  );

  useEffect(() => {
    setMounted(true);
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.dataset.theme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  // background & text classes based on theme
  const bgClass = isDark
    ? "bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white"
    : "bg-blue-400";

  const navLinkClass = isDark
    ? "hover:opacity-100 transition-opacity"
    : "hover:opacity-100 transition-opacity text-slate-700";

  const buttonClass = isDark
    ? "ml-2 rounded-2xl px-4 py-2 bg-white text-slate-900 font-medium hover:shadow-lg transition-shadow"
    : "ml-2 rounded-2xl px-4 py-2 bg-blue-600 text-white font-medium hover:shadow-lg transition-shadow";

  return (
    <div
      className={`pt-10 min-h-screen w-full relative overflow-hidden ${bgClass}`}
    >
      {/* Top Nav */}
      {/* <header className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`h-9 w-9 rounded-2xl shadow-lg grid place-items-center font-bold ${
                isDark
                  ? "bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-cyan-900/40 text-white"
                  : "bg-gradient-to-tr from-blue-500 to-indigo-400 shadow-blue-500/40 text-white"
              }`}
            >
              L
            </div>
            <div className="text-lg font-semibold tracking-wide">lenna.ai</div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm opacity-90">
            <a className={navLinkClass} href="#features">
              Features
            </a>
            <a className={navLinkClass} href="#demos">
              Demos
            </a>
            <a className={navLinkClass} href="#contact">
              Contact
            </a>
            <a href="#get-started" className={buttonClass}>
              Get Started
            </a>
          </nav>
        </div>
      </header> */}

      {/* 3D Canvas */}
      <div className="relative h-[68vh] md:h-[78vh] w-full">
        {mounted && (
          <Canvas
            camera={{ position: [0, 1.2, 9], fov: 50 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
          >
            <Scene />
          </Canvas>
        )}
      </div>

      <HomepageFeatures />
    </div>
  );
}
