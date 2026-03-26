import { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

/* ── Procedural 3D Models ── */

const IcosahedronModel = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.08;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.1;
      wireRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 4]} />
          <meshPhongMaterial
            color="#111111"
            emissive="#ff4400"
            emissiveIntensity={0.08}
            shininess={220}
            transparent
            opacity={0.92}
          />
        </mesh>
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[1.7, 2]} />
          <meshBasicMaterial
            color="#ff4400"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
        {/* Orbital ring */}
        <mesh rotation={[0.8, 0, 0.3]}>
          <torusGeometry args={[2.2, 0.01, 16, 100]} />
          <meshBasicMaterial color="#ff4400" transparent opacity={0.25} />
        </mesh>
        <mesh rotation={[-0.4, 0, 1.2]}>
          <torusGeometry args={[2.6, 0.008, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
        </mesh>
      </group>
    </Float>
  );
};

const TorusKnotModel = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2;
      ref.current.rotation.x += delta * 0.1;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1, 0.35, 200, 32]} />
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#7850ff"
          emissiveIntensity={0.15}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

const SphereModel = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive="#3c82ff"
          emissiveIntensity={0.12}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const models = [
  { id: "icosahedron", label: "Geo Core", component: IcosahedronModel },
  { id: "torusknot", label: "Topology", component: TorusKnotModel },
  { id: "sphere", label: "Surface", component: SphereModel },
];

const ModelShowcase = () => {
  const [activeModel, setActiveModel] = useState(0);
  const ActiveComponent = models[activeModel].component;

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(120,80,255,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-custom">
        <p className="section-label mb-4">Interactive</p>
        <h2 className="section-heading text-foreground mb-4">3D Showcase</h2>
        <p className="font-body text-[15px] text-muted-foreground mb-12 max-w-lg">
          Explore interactive 3D models — rotate, zoom, and interact. These demonstrate
          the rendering and interaction capabilities I build for clients.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Canvas */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] rounded-2xl overflow-hidden border border-foreground/[0.07] bg-card">
            <Canvas
              camera={{ position: [0, 0, 6], fov: 45 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
              <pointLight position={[-3, 2, 4]} color="#ff4400" intensity={0.4} />
              <pointLight position={[3, -2, -4]} color="#7850ff" intensity={0.2} />

              <Suspense fallback={null}>
                <ActiveComponent />
                <ContactShadows
                  position={[0, -2, 0]}
                  opacity={0.3}
                  scale={10}
                  blur={2}
                  color="#000000"
                />
                <Environment preset="night" />
              </Suspense>

              <OrbitControls
                enablePan={false}
                enableZoom
                minDistance={3}
                maxDistance={10}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>

            {/* Overlay hint */}
            <div className="absolute bottom-4 left-4 z-10">
              <span className="font-mono-custom text-[9px] uppercase tracking-[0.15em] text-muted-foreground/50 bg-background/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                Drag to rotate · Scroll to zoom
              </span>
            </div>
          </div>

          {/* Model selector */}
          <div className="flex flex-row lg:flex-col gap-3">
            {models.map((model, i) => (
              <button
                key={model.id}
                onClick={() => setActiveModel(i)}
                className={`flex-1 lg:flex-none text-left p-5 rounded-xl border transition-smooth ${
                  activeModel === i
                    ? "border-primary/40 bg-primary/[0.05]"
                    : "border-foreground/[0.07] bg-card/50 hover:border-foreground/20"
                }`}
              >
                <span className="font-mono-custom text-[9px] uppercase tracking-[0.15em] text-muted-foreground block mb-1">
                  Model {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-body font-medium text-sm ${
                    activeModel === i ? "text-primary" : "text-foreground"
                  }`}
                >
                  {model.label}
                </span>
              </button>
            ))}

            <div className="hidden lg:block mt-auto p-5 rounded-xl border border-foreground/[0.07] bg-card/30">
              <p className="font-mono-custom text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                Upload Your Model
              </p>
              <p className="font-body text-[12px] text-muted-foreground/60 leading-relaxed">
                GLB/GLTF models can be loaded for interactive preview. Contact me for custom 3D experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelShowcase;
