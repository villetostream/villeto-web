"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

const ROTATION_INTERVAL = 4400;

const workflows = [
  {
    label: "Procurement",
    eyebrow: "PURCHASE REQUEST",
    title: "Aster Cloud",
    detail: "Annual analytics workspace",
    amount: "$6,800",
    status: "Ready for policy",
    rows: ["Business need captured", "Budget owner linked", "Vendor selected"],
    accent: "#68ddca",
  },
  {
    label: "Policy engine",
    eyebrow: "POLICY EVALUATION",
    title: "3 controls evaluated",
    detail: "Rules applied before approval",
    amount: "SW-05",
    status: "Cleared automatically",
    rows: ["Budget available", "Vendor risk cleared", "Finance route selected"],
    accent: "#8de6d8",
  },
  {
    label: "Employee expenses",
    eyebrow: "EMPLOYEE EXPENSE",
    title: "Adobe · $84.99",
    detail: "Software · Today",
    amount: "IN POLICY",
    status: "Posted to ledger",
    rows: ["Receipt matched", "Employee limit checked", "Category coded"],
    accent: "#d6c980",
  },
] as const;

const panelTargets = [
  { position: new THREE.Vector3(0, 0.08, 0.6), rotationY: 0, scale: 1, opacity: 1 },
  { position: new THREE.Vector3(3.15, 0.22, -2.15), rotationY: -0.6, scale: 0.78, opacity: 0.52 },
  { position: new THREE.Vector3(-3.15, -0.12, -2.45), rotationY: 0.62, scale: 0.74, opacity: 0.4 },
] as const;

type PanelGroup = THREE.Group & {
  userData: {
    opacity: number;
    panelMaterial: THREE.MeshBasicMaterial;
    shadowMaterial: THREE.MeshBasicMaterial;
  };
};

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill: string,
  stroke?: string,
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fillStyle = fill;
  context.fill();
  if (stroke) {
    context.strokeStyle = stroke;
    context.lineWidth = 2;
    context.stroke();
  }
}

function drawCheck(context: CanvasRenderingContext2D, x: number, y: number, accent: string) {
  context.beginPath();
  context.arc(x, y, 13, 0, Math.PI * 2);
  context.fillStyle = `${accent}22`;
  context.fill();
  context.strokeStyle = accent;
  context.lineWidth = 2.5;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.beginPath();
  context.moveTo(x - 5, y);
  context.lineTo(x - 1, y + 4);
  context.lineTo(x + 6, y - 5);
  context.stroke();
}

function createPanelTexture(renderer: THREE.WebGLRenderer, workflow: (typeof workflows)[number]) {
  const canvas = document.createElement("canvas");
  canvas.width = 960;
  canvas.height = 600;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D context is unavailable");

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawRoundedRect(context, 10, 10, 940, 580, 30, "#0d1512", "#2a3933");

  context.save();
  context.beginPath();
  context.roundRect(10, 10, 940, 580, 30);
  context.clip();

  context.fillStyle = "#111d18";
  context.fillRect(10, 10, 940, 92);
  context.fillStyle = workflow.accent;
  context.fillRect(10, 100, 940, 3);

  context.fillStyle = workflow.accent;
  context.font = "700 30px Inter, Arial, sans-serif";
  context.fillText("V", 48, 68);
  context.fillStyle = "#f3f7f5";
  context.font = "600 22px Inter, Arial, sans-serif";
  context.fillText("VILLETO", 84, 66);
  context.fillStyle = "#82938b";
  context.font = "500 17px Inter, Arial, sans-serif";
  context.textAlign = "right";
  context.fillText("LIVE CONTROL LAYER", 910, 64);
  context.textAlign = "left";

  context.fillStyle = workflow.accent;
  context.font = "700 18px Inter, Arial, sans-serif";
  context.fillText(workflow.eyebrow, 52, 154);
  context.fillStyle = "#f5f7f6";
  context.font = "600 42px Inter, Arial, sans-serif";
  context.fillText(workflow.title, 52, 212);
  context.fillStyle = "#91a099";
  context.font = "400 21px Inter, Arial, sans-serif";
  context.fillText(workflow.detail, 52, 250);

  drawRoundedRect(context, 718, 139, 190, 74, 14, `${workflow.accent}18`, `${workflow.accent}55`);
  context.fillStyle = workflow.accent;
  context.textAlign = "center";
  context.font = "700 24px Inter, Arial, sans-serif";
  context.fillText(workflow.amount, 813, 185);
  context.textAlign = "left";

  workflow.rows.forEach((row, index) => {
    const y = 318 + index * 70;
    if (index > 0) {
      context.fillStyle = "#25322d";
      context.fillRect(52, y - 34, 856, 1);
    }
    drawCheck(context, 72, y, workflow.accent);
    context.fillStyle = "#d9e1dd";
    context.font = "500 21px Inter, Arial, sans-serif";
    context.fillText(row, 108, y + 7);
    context.fillStyle = "#6f8179";
    context.textAlign = "right";
    context.font = "500 17px Inter, Arial, sans-serif";
    context.fillText(index === 2 ? "COMPLETE" : "VERIFIED", 905, y + 6);
    context.textAlign = "left";
  });

  drawRoundedRect(context, 52, 520, 856, 48, 12, `${workflow.accent}14`);
  context.fillStyle = workflow.accent;
  context.font = "600 18px Inter, Arial, sans-serif";
  context.fillText(workflow.status, 76, 552);
  context.textAlign = "right";
  context.fillText("→", 878, 552);
  context.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
  texture.needsUpdate = true;
  return texture;
}

function getPanelTarget(index: number, active: number) {
  const relative = (index - active + workflows.length) % workflows.length;
  return panelTargets[relative] ?? panelTargets[0];
}

export function SpendControlScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const reduceMotion = Boolean(useReducedMotion());
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % workflows.length), ROTATION_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [active, paused, reduceMotion]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 0, 8.4);

    const stage = new THREE.Group();
    stage.rotation.x = -0.035;
    scene.add(stage);

    const panelGeometry = new THREE.PlaneGeometry(4.35, 2.72);
    const shadowGeometry = new THREE.PlaneGeometry(4.55, 2.92);
    const textures: THREE.CanvasTexture[] = [];

    const panels = workflows.map((workflow, index) => {
      const texture = createPanelTexture(renderer, workflow);
      textures.push(texture);

      const panelMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: true });
      const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x020706, transparent: true, opacity: 0.35, depthWrite: false });
      const group = new THREE.Group() as PanelGroup;
      const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
      const panel = new THREE.Mesh(panelGeometry, panelMaterial);
      shadow.position.set(0.08, -0.11, -0.09);
      panel.position.z = 0.02;
      group.add(shadow, panel);

      const target = getPanelTarget(index, activeRef.current);
      group.position.copy(target.position);
      group.rotation.y = target.rotationY;
      group.scale.setScalar(target.scale);
      group.userData = { opacity: target.opacity, panelMaterial, shadowMaterial };
      panelMaterial.opacity = target.opacity;
      shadowMaterial.opacity = target.opacity * 0.28;
      stage.add(group);
      return group;
    });

    const grid = new THREE.GridHelper(14, 14, 0x68ddca, 0x68ddca);
    grid.position.set(0, -2.12, -2.2);
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.07;
      material.depthWrite = false;
    });
    scene.add(grid);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = camera.aspect < 0.92 ? 10.4 : camera.aspect < 1.15 ? 9.2 : 8.4;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const targetScaleVector = new THREE.Vector3();
    let animationFrame = 0;
    let elapsed = 0;
    let previousTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      elapsed += delta;
      const smoothing = reduceMotion ? 1 : 1 - Math.exp(-delta * 5.5);

      panels.forEach((panel, index) => {
        const target = getPanelTarget(index, activeRef.current);
        panel.position.lerp(target.position, smoothing);
        panel.rotation.y = THREE.MathUtils.lerp(panel.rotation.y, target.rotationY, smoothing);
        const targetScale = target.scale + (reduceMotion || index !== activeRef.current ? 0 : Math.sin(elapsed * 1.1) * 0.006);
        panel.scale.lerp(targetScaleVector.set(targetScale, targetScale, targetScale), smoothing);
        panel.userData.opacity = THREE.MathUtils.lerp(panel.userData.opacity, target.opacity, smoothing);
        panel.userData.panelMaterial.opacity = panel.userData.opacity;
        panel.userData.shadowMaterial.opacity = panel.userData.opacity * 0.28;
      });

      const pointerX = reduceMotion ? 0 : pointerRef.current.x;
      const pointerY = reduceMotion ? 0 : pointerRef.current.y;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointerX * 0.3, 0.04);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointerY * 0.2, 0.04);
      camera.lookAt(0, 0, -0.4);
      stage.rotation.z = THREE.MathUtils.lerp(stage.rotation.z, pointerX * -0.012, 0.035);

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      panelGeometry.dispose();
      shadowGeometry.dispose();
      textures.forEach((texture) => texture.dispose());
      panels.forEach((panel) => {
        panel.userData.panelMaterial.dispose();
        panel.userData.shadowMaterial.dispose();
      });
      grid.geometry.dispose();
      gridMaterials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, [reduceMotion]);

  return (
    <div
      className="relative mx-auto w-full max-w-[800px] py-2 sm:py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        pointerRef.current = { x: 0, y: 0 };
      }}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
          y: -(((event.clientY - bounds.top) / bounds.height) * 2 - 1),
        };
      }}
    >
      <div ref={hostRef} className="relative h-[410px] w-full overflow-hidden sm:h-[500px] md:h-[560px]">
        <canvas
          ref={canvasRef}
          data-three-scene="spend-control"
          role="img"
          aria-label="Three-dimensional Villeto workflow showing procurement, policy evaluation, and employee expenses"
          className="absolute inset-0 size-full"
        />
        <div className="pointer-events-none absolute inset-x-2 top-4 flex items-center justify-between sm:inset-x-4">
          <span className="type-meta flex items-center gap-2 font-semibold uppercase text-[var(--accent-text)]"><span className="size-1.5 rounded-full bg-[var(--accent)]" />Live spend control</span>
          <span className="type-meta hidden font-medium text-[var(--text-secondary)] sm:block">Policy-aware system</span>
        </div>
      </div>

      <div className="grid grid-cols-3 border-y border-[var(--border-hairline)]" role="group" aria-label="Select workflow view">
        {workflows.map((workflow, index) => {
          const selected = active === index;
          return (
            <button
              key={workflow.label}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(index)}
              className={`relative min-h-[64px] border-r border-[var(--border-hairline)] px-2 py-3 text-left last:border-r-0 sm:px-4 ${selected ? "bg-[var(--accent-soft)]/45" : "hover:bg-[var(--bg-surface)]"}`}
            >
              <span className={`type-meta block font-semibold ${selected ? "text-[var(--accent-text)]" : "text-[var(--text-secondary)]"}`}>0{index + 1}</span>
              <span className={`type-ui mt-1 block whitespace-normal font-semibold leading-[1.2] ${selected ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>{workflow.label}</span>
              {selected && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--accent)]" />}
            </button>
          );
        })}
      </div>
      <p className="type-meta mt-3 min-h-[20px] text-right font-medium text-[var(--text-secondary)]">{workflows[active]?.status}</p>
    </div>
  );
}
