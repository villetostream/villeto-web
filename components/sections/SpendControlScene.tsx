"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

type FloatingObject = {
  group: THREE.Group;
  basePosition: THREE.Vector3;
  baseRotation: THREE.Euler;
  amplitude: number;
  phase: number;
};

function roundedRect(
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

function check(context: CanvasRenderingContext2D, x: number, y: number, color = "#0ea894") {
  context.beginPath();
  context.arc(x, y, 13, 0, Math.PI * 2);
  context.fillStyle = `${color}20`;
  context.fill();
  context.strokeStyle = color;
  context.lineWidth = 2.4;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.beginPath();
  context.moveTo(x - 5, y);
  context.lineTo(x - 1, y + 4);
  context.lineTo(x + 6, y - 5);
  context.stroke();
}

function canvasTexture(renderer: THREE.WebGLRenderer, width: number, height: number, draw: (context: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D context is unavailable");
  draw(context);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
  texture.needsUpdate = true;
  return texture;
}

function cardTexture(renderer: THREE.WebGLRenderer) {
  return canvasTexture(renderer, 900, 560, (context) => {
    roundedRect(context, 8, 8, 884, 544, 38, "#09110e", "#33443d");
    context.fillStyle = "#6fe0ce";
    context.font = "700 30px Inter, Arial, sans-serif";
    context.fillText("V", 54, 72);
    context.fillStyle = "#f4f7f5";
    context.font = "600 22px Inter, Arial, sans-serif";
    context.fillText("VILLETO", 94, 70);
    context.fillStyle = "#73857d";
    context.textAlign = "right";
    context.font = "600 17px Inter, Arial, sans-serif";
    context.fillText("CONTROL CARD", 844, 68);
    context.textAlign = "left";

    roundedRect(context, 58, 132, 94, 70, 12, "#b8a56a");
    context.strokeStyle = "#74683f";
    context.lineWidth = 2;
    context.strokeRect(81, 132, 2, 70);
    context.strokeRect(126, 132, 2, 70);
    context.strokeRect(58, 154, 94, 2);
    context.strokeRect(58, 180, 94, 2);

    context.fillStyle = "#f4f7f5";
    context.font = "500 34px Inter, Arial, sans-serif";
    context.fillText("••••  ••••  ••••  2048", 58, 312);
    context.fillStyle = "#72827b";
    context.font = "600 16px Inter, Arial, sans-serif";
    context.fillText("CARDHOLDER", 58, 404);
    context.fillText("POLICY", 595, 404);
    context.fillStyle = "#e4ebe7";
    context.font = "600 21px Inter, Arial, sans-serif";
    context.fillText("AMARA OKAFOR", 58, 440);
    context.fillStyle = "#6fe0ce";
    context.fillText("SW-05 · ACTIVE", 595, 440);
    context.textAlign = "right";
    context.fillStyle = "#8b9b94";
    context.font = "500 17px Inter, Arial, sans-serif";
    context.fillText("BUSINESS EXPENSE", 844, 510);
  });
}

function phoneTexture(renderer: THREE.WebGLRenderer) {
  return canvasTexture(renderer, 500, 1000, (context) => {
    roundedRect(context, 5, 5, 490, 990, 50, "#0a0f0d");
    roundedRect(context, 22, 40, 456, 920, 36, "#f7f9f8");
    roundedRect(context, 180, 20, 140, 28, 14, "#0a0f0d");

    context.fillStyle = "#0b6e61";
    context.font = "700 25px Inter, Arial, sans-serif";
    context.fillText("V", 52, 104);
    context.fillStyle = "#111714";
    context.font = "600 19px Inter, Arial, sans-serif";
    context.fillText("VILLETO", 84, 102);
    context.fillStyle = "#6d7973";
    context.textAlign = "right";
    context.font = "500 16px Inter, Arial, sans-serif";
    context.fillText("EXPENSE", 444, 100);
    context.textAlign = "left";

    context.fillStyle = "#64716b";
    context.font = "600 16px Inter, Arial, sans-serif";
    context.fillText("TODAY", 52, 174);
    context.fillStyle = "#111714";
    context.font = "600 35px Inter, Arial, sans-serif";
    context.fillText("Adobe", 52, 232);
    context.fillStyle = "#111714";
    context.textAlign = "right";
    context.fillText("$84.99", 444, 232);
    context.textAlign = "left";
    context.fillStyle = "#748079";
    context.font = "400 18px Inter, Arial, sans-serif";
    context.fillText("Software · Amara Okafor", 52, 270);

    roundedRect(context, 52, 318, 392, 126, 22, "#e3f5f1");
    check(context, 90, 380);
    context.fillStyle = "#111714";
    context.font = "600 20px Inter, Arial, sans-serif";
    context.fillText("Expense approved", 122, 372);
    context.fillStyle = "#537068";
    context.font = "400 16px Inter, Arial, sans-serif";
    context.fillText("No action needed", 122, 402);

    const rows: Array<[string, string]> = [
      ["Receipt", "Matched"],
      ["Policy SW-05", "Passed"],
      ["Ledger code", "Software"],
    ];
    rows.forEach(([label, value], index) => {
      const y = 530 + index * 92;
      context.fillStyle = "#dce2df";
      context.fillRect(52, y - 34, 392, 1);
      context.fillStyle = "#68756f";
      context.font = "500 17px Inter, Arial, sans-serif";
      context.fillText(label, 52, y + 4);
      context.fillStyle = "#111714";
      context.textAlign = "right";
      context.font = "600 17px Inter, Arial, sans-serif";
      context.fillText(value, 444, y + 4);
      context.textAlign = "left";
    });

    roundedRect(context, 52, 836, 392, 64, 18, "#0ea894");
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.font = "600 18px Inter, Arial, sans-serif";
    context.fillText("View transaction record", 248, 876);
    context.textAlign = "left";
  });
}

function requestTexture(renderer: THREE.WebGLRenderer) {
  return canvasTexture(renderer, 900, 560, (context) => {
    roundedRect(context, 8, 8, 884, 544, 28, "#ffffff", "#dce3df");
    context.fillStyle = "#0b6e61";
    context.font = "700 18px Inter, Arial, sans-serif";
    context.fillText("PURCHASE REQUEST · PR-0248", 50, 64);
    context.fillStyle = "#111714";
    context.font = "600 38px Inter, Arial, sans-serif";
    context.fillText("Aster Cloud", 50, 126);
    context.fillStyle = "#6b7771";
    context.font = "400 19px Inter, Arial, sans-serif";
    context.fillText("Annual analytics workspace", 50, 164);
    roundedRect(context, 682, 66, 166, 70, 14, "#e5f6f2");
    context.fillStyle = "#0b6e61";
    context.textAlign = "center";
    context.font = "700 24px Inter, Arial, sans-serif";
    context.fillText("$6,800", 765, 110);
    context.textAlign = "left";

    const rows = ["Business need captured", "Budget owner assigned", "Vendor profile verified"];
    rows.forEach((row, index) => {
      const y = 250 + index * 68;
      check(context, 68, y);
      context.fillStyle = "#25302b";
      context.font = "500 19px Inter, Arial, sans-serif";
      context.fillText(row, 102, y + 6);
    });

    roundedRect(context, 50, 458, 798, 58, 14, "#111714");
    context.fillStyle = "#71decd";
    context.font = "600 18px Inter, Arial, sans-serif";
    context.fillText("READY FOR POLICY EVALUATION", 78, 495);
    context.textAlign = "right";
    context.fillText("→", 816, 495);
    context.textAlign = "left";
  });
}

function invoiceTexture(renderer: THREE.WebGLRenderer) {
  return canvasTexture(renderer, 560, 360, (context) => {
    roundedRect(context, 6, 6, 548, 348, 20, "#fbfcfb", "#dbe2de");
    context.fillStyle = "#77837d";
    context.font = "700 15px Inter, Arial, sans-serif";
    context.fillText("INVOICE · INV-2048", 38, 54);
    context.fillStyle = "#111714";
    context.font = "600 28px Inter, Arial, sans-serif";
    context.fillText("Aster Cloud", 38, 108);
    context.fillStyle = "#637069";
    context.font = "400 17px Inter, Arial, sans-serif";
    context.fillText("Due Friday · ACH", 38, 142);
    context.fillStyle = "#111714";
    context.textAlign = "right";
    context.font = "700 28px Inter, Arial, sans-serif";
    context.fillText("$6,800", 520, 108);
    context.textAlign = "left";
    roundedRect(context, 38, 202, 484, 92, 16, "#e3f5f1");
    check(context, 76, 248);
    context.fillStyle = "#111714";
    context.font = "600 19px Inter, Arial, sans-serif";
    context.fillText("Matched to request and approval", 108, 242);
    context.fillStyle = "#527068";
    context.font = "400 15px Inter, Arial, sans-serif";
    context.fillText("Audit evidence attached", 108, 270);
  });
}

function policyTexture(renderer: THREE.WebGLRenderer) {
  return canvasTexture(renderer, 540, 170, (context) => {
    roundedRect(context, 4, 4, 532, 162, 26, "#0c1713", "#365047");
    check(context, 54, 85, "#72dfce");
    context.fillStyle = "#72dfce";
    context.font = "700 17px Inter, Arial, sans-serif";
    context.fillText("POLICY SW-05", 88, 70);
    context.fillStyle = "#f2f6f4";
    context.font = "600 21px Inter, Arial, sans-serif";
    context.fillText("Controls active", 88, 104);
    context.fillStyle = "#84978e";
    context.textAlign = "right";
    context.font = "600 15px Inter, Arial, sans-serif";
    context.fillText("3 / 3 PASSED", 494, 90);
    context.textAlign = "left";
  });
}

function physicalPanel(
  texture: THREE.CanvasTexture,
  width: number,
  height: number,
  depth: number,
  radius: number,
  backingColor: number,
) {
  const group = new THREE.Group();
  const backing = new THREE.Mesh(
    new RoundedBoxGeometry(width, height, depth, 5, radius),
    new THREE.MeshStandardMaterial({ color: backingColor, roughness: 0.62, metalness: 0.05 }),
  );
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(width - 0.04, height - 0.04),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true }),
  );
  face.position.z = depth / 2 + 0.006;
  backing.castShadow = true;
  backing.receiveShadow = true;
  group.add(backing, face);
  return group;
}

export function SpendControlScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const reduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0.15, 9.6);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x65716b, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.6);
    keyLight.position.set(-4, 6, 9);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const tableau = new THREE.Group();
    tableau.rotation.set(-0.025, 0.04, -0.025);
    scene.add(tableau);

    const platform = new THREE.Mesh(
      new RoundedBoxGeometry(8.8, 5.8, 0.34, 6, 0.22),
      new THREE.MeshStandardMaterial({ color: 0xf1f4f2, roughness: 0.82, metalness: 0.02 }),
    );
    platform.position.z = -0.5;
    platform.receiveShadow = true;
    tableau.add(platform);

    const cardMap = cardTexture(renderer);
    const phoneMap = phoneTexture(renderer);
    const requestMap = requestTexture(renderer);
    const invoiceMap = invoiceTexture(renderer);
    const policyMap = policyTexture(renderer);
    const textures = [cardMap, phoneMap, requestMap, invoiceMap, policyMap];

    const request = physicalPanel(requestMap, 4.05, 2.52, 0.1, 0.12, 0xe8ecea);
    request.position.set(1.65, 1.15, -0.05);
    request.rotation.set(-0.02, -0.05, 0.055);
    tableau.add(request);

    const card = physicalPanel(cardMap, 3.55, 2.2, 0.13, 0.16, 0x09110e);
    card.position.set(-1.75, 0.48, 0.55);
    card.rotation.set(-0.025, 0.09, -0.14);
    tableau.add(card);

    const phone = physicalPanel(phoneMap, 1.72, 3.44, 0.16, 0.2, 0x090d0b);
    phone.position.set(1.62, -0.64, 1.03);
    phone.rotation.set(-0.03, -0.08, 0.13);
    tableau.add(phone);

    const invoice = physicalPanel(invoiceMap, 2.68, 1.72, 0.08, 0.1, 0xe7ebe9);
    invoice.position.set(-2.12, -1.62, 0.24);
    invoice.rotation.set(-0.02, 0.05, 0.075);
    tableau.add(invoice);

    const policy = physicalPanel(policyMap, 2.4, 0.76, 0.09, 0.14, 0x0c1713);
    policy.position.set(-0.05, 1.85, 1.02);
    policy.rotation.set(-0.02, 0.03, -0.025);
    tableau.add(policy);

    const floatingObjects: FloatingObject[] = [
      { group: card, basePosition: card.position.clone(), baseRotation: card.rotation.clone(), amplitude: 0.045, phase: 0 },
      { group: phone, basePosition: phone.position.clone(), baseRotation: phone.rotation.clone(), amplitude: 0.06, phase: 1.4 },
      { group: request, basePosition: request.position.clone(), baseRotation: request.rotation.clone(), amplitude: 0.025, phase: 2.2 },
      { group: invoice, basePosition: invoice.position.clone(), baseRotation: invoice.rotation.clone(), amplitude: 0.035, phase: 3.1 },
      { group: policy, basePosition: policy.position.clone(), baseRotation: policy.rotation.clone(), amplitude: 0.05, phase: 4.2 },
    ];

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = camera.aspect < 0.92 ? 12.6 : camera.aspect < 1.15 ? 11 : 9.6;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    let frame = 0;
    let elapsed = 0;
    let previousTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      elapsed += delta;

      const pointerX = reduceMotion ? 0 : pointerRef.current.x;
      const pointerY = reduceMotion ? 0 : pointerRef.current.y;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointerX * 0.38, 0.035);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.15 + pointerY * 0.25, 0.035);
      camera.lookAt(0, 0, -0.2);

      tableau.rotation.y = THREE.MathUtils.lerp(tableau.rotation.y, 0.04 + pointerX * 0.045, 0.035);
      tableau.rotation.x = THREE.MathUtils.lerp(tableau.rotation.x, -0.025 - pointerY * 0.03, 0.035);

      floatingObjects.forEach((object, index) => {
        const movement = reduceMotion ? 0 : Math.sin(elapsed * (0.7 + index * 0.04) + object.phase);
        object.group.position.z = object.basePosition.z + movement * object.amplitude;
        object.group.rotation.z = object.baseRotation.z + movement * 0.006;
      });

      policy.scale.setScalar(reduceMotion ? 1 : 1 + Math.sin(elapsed * 1.2) * 0.008);
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };

    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      });
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, [reduceMotion]);

  return (
    <div
      className="relative mx-auto w-full max-w-[820px]"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
          y: -(((event.clientY - bounds.top) / bounds.height) * 2 - 1),
        };
      }}
      onPointerLeave={() => {
        pointerRef.current = { x: 0, y: 0 };
      }}
    >
      <div ref={hostRef} className="relative h-[360px] w-full overflow-hidden sm:h-[500px] md:h-[590px]">
        <canvas
          ref={canvasRef}
          data-three-scene="spend-control"
          role="img"
          aria-label="Three-dimensional Villeto product scene with a control card, mobile expense approval, purchase request, policy check, and matched invoice"
          className="absolute inset-0 size-full"
        />
      </div>
      <div className="sr-only">
        <p>Purchase request PR-0248 for Aster Cloud, valued at $6,800.</p>
        <p>Policy SW-05 passed all three controls.</p>
        <p>Adobe employee expense approved with its receipt matched.</p>
        <p>Invoice INV-2048 matched to its request and approval.</p>
      </div>
    </div>
  );
}
