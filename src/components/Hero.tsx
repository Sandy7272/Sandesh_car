import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

declare global {
  interface Window {
    THREE: typeof import("three") | undefined;
  }
}

const Hero = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const initThreeScene = useCallback(() => {
    const THREE = window.THREE;
    if (!THREE || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Sphere group offset to right-centre
    const sphereGroup = new THREE.Group();
    sphereGroup.position.x = 1.8;
    scene.add(sphereGroup);

    // Main icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.4, 4);
    const icoMat = new THREE.MeshPhongMaterial({
      color: 0x111111,
      emissive: 0xff4400,
      emissiveIntensity: 0.08,
      shininess: 220,
      transparent: true,
      opacity: 0.92,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    sphereGroup.add(ico);

    // Wireframe shell
    const wireGeo = new THREE.IcosahedronGeometry(1.55, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff4400,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    sphereGroup.add(new THREE.Mesh(wireGeo, wireMat));

    // Orbital rings
    const rings = [
      { radius: 1.65, color: 0xff4400, opacity: 0.3, rotX: 0.8, rotZ: 0.3 },
      { radius: 2.2, color: 0xffffff, opacity: 0.08, rotX: -0.4, rotZ: 1.2 },
      { radius: 2.8, color: 0x4488ff, opacity: 0.05, rotX: 1.5, rotZ: -0.6 },
    ];
    const ringMeshes = rings.map((r) => {
      const geo = new THREE.TorusGeometry(r.radius, 0.008, 16, 100);
      const mat = new THREE.MeshBasicMaterial({ color: r.color, transparent: true, opacity: r.opacity });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = r.rotX;
      mesh.rotation.z = r.rotZ;
      sphereGroup.add(mesh);
      return mesh;
    });

    // Particle cloud
    const particleCount = 2500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const orangeColor = new THREE.Color(0xff4400);
    const whiteColor = new THREE.Color(0xffffff);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.5 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = Math.random() > 0.7 ? orangeColor : whiteColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({ size: 0.03, vertexColors: true, transparent: true, opacity: 0.6 });
    sphereGroup.add(new THREE.Points(particleGeo, particleMat));

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const pointLight = new THREE.PointLight(0xff4400, 0.5, 10);
    pointLight.position.set(-3, 2, 4);
    scene.add(pointLight);

    // Mouse parallax
    let targetX = 0, targetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize
    const onResize = () => {
      if (!container.clientWidth) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Animate
    let animId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!reducedMotion) {
        ico.rotation.y = t * 0.15;
        ico.rotation.x = t * 0.08;
        sphereGroup.position.y = Math.sin(t * 0.6) * 0.1;

        ringMeshes.forEach((ring, i) => {
          ring.rotation.z += 0.001 * (i % 2 === 0 ? 1 : -1);
        });

        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y) * 0.02;
        camera.lookAt(sphereGroup.position);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      container.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (!window.THREE) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.onload = () => {
        const cleanup = initThreeScene();
        return cleanup;
      };
      document.head.appendChild(script);
    } else {
      const cleanup = initThreeScene();
      return cleanup;
    }
  }, [isMobile, initThreeScene]);

  return (
    <section className="min-h-screen flex items-center section-padding">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
        {/* Left column */}
        <div className="space-y-8">
          <motion.div {...fadeUp(0)} className="flex items-center gap-2 font-mono-custom text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            Available for work <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-blink" />
          </motion.div>

          <div>
            <motion.h1
              {...fadeUp(0.08)}
              className="font-display italic text-foreground leading-[0.95]"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
            >
              Sandesh
            </motion.h1>
            <motion.h1
              {...fadeUp(0.16)}
              className="font-display italic text-primary leading-[0.95]"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
            >
              Gadakh.
            </motion.h1>
          </div>

          <motion.p {...fadeUp(0.24)} className="font-body text-base text-muted-foreground max-w-md leading-relaxed">
            3D Artist & Creative Technologist. Building immersive spatial experiences — from Gaussian Splatting to real-time AR/VR.
          </motion.p>

          <motion.div {...fadeUp(0.32)} className="flex flex-wrap gap-4">
            <a
              href="#work"
              className="inline-flex items-center font-mono-custom text-[12px] uppercase tracking-[0.15em] bg-primary text-primary-foreground px-7 py-3.5 rounded-full hover:brightness-110 transition-smooth"
            >
              View Work →
            </a>
            <a
              href="#"
              className="inline-flex items-center font-mono-custom text-[12px] uppercase tracking-[0.15em] border border-foreground/[0.15] text-foreground px-7 py-3.5 rounded-full hover:border-primary hover:text-primary transition-smooth"
            >
              Download CV
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="flex items-center gap-0 font-mono-custom text-[11px] uppercase tracking-[0.15em]">
            {[
              { num: "4+", label: "Years" },
              { num: "50+", label: "Projects" },
              { num: "3×", label: "Best Employee" },
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col gap-1 ${i > 0 ? "border-l border-foreground/[0.07] pl-6 ml-6" : ""}`}>
                <span className="text-foreground text-lg font-display italic">{stat.num}</span>
                <span className="text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — 3D scene or fallback */}
        <motion.div
          {...fadeUp(0.3)}
          className="relative overflow-hidden rounded-lg aspect-[4/5] lg:aspect-[3/4]"
        >
          {isMobile ? (
            <>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
              <div className="absolute top-4 right-4 z-20">
                <span className="pill">2024</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <p className="font-body text-foreground text-lg mb-2">L&T Realty Virtual Tour</p>
                <span className="pill">Real Estate · 3D</span>
              </div>
            </>
          ) : (
            <div ref={canvasContainerRef} className="absolute inset-0" />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
