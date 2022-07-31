<script lang="ts">
import { onDestroy } from "svelte";
import { useFrame, InstancedMesh, Instance, type Position, useThrelte } from "@threlte/core";
import { MeshStandardMaterial, TetrahedronGeometry } from "three";
import type { Particle } from "../lib/types";
import { getParticles } from "../lib/three-utils";
import { type ClientXY, cursorPosition } from "$lib/stores/cursor-store";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
// import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";


/**
 * PROPS
 */
export let position: Position;

let particles: Array<Particle> = getParticles(150);
const material = new MeshStandardMaterial({ color: "#696767", roughness: 0, metalness: 0.1 });
const geometry = new TetrahedronGeometry(1);
const { size } = useThrelte();

const storeCursorPosition = (event) => {
  cursorPosition.update(() => {
      return {
        x: event.clientX / $size.width - 0.5,
        y: event.clientY / $size.height - 0.5
      } as ClientXY;
    }
  );
};
window.addEventListener("mousemove", storeCursorPosition);


useFrame((state) => {
  particles.forEach((particle) => {
    let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
    t = particle.t += speed / 2;
    const time = state.clock.getElapsedTime();

    const a = Math.cos(t) + Math.sin(t * 1) / 10;
    const b = Math.sin(t) + Math.cos(t * 2) / 10;
    const s = Math.max(1.5, Math.cos(t) * 5);

    // adjust particle position with cursor position
    particle.mx += ($cursorPosition.x * $size.width - particle.mx) * 0.005;
    particle.my += ($cursorPosition.y * $size.height - particle.my) * 0.005;

    // position
    particle.position = {
      x: (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
      y: (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
      z: (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
    };

    // rotation
    particle.rotation = {
      x: ((Math.cos(time / 4) / 2) * xFactor) / 3,
      y: ((Math.sin(time / 4) / 2) * yFactor) / 3,
      z: ((Math.cos(time / 1.5) / 2) * zFactor) / 3
    };

    // scale
    particle.scale = { x: s, y: s, z: s };
  });

  particles = particles;
});

onDestroy(() => {
  window.removeEventListener("mousemove", storeCursorPosition);
});

</script>


<InstancedMesh {geometry} {material} position={position}>
  {#each particles as particle, index}
    <Instance position={particle.position}
              rotation={particle.rotation}
              scale={particle.scale} />
  {/each}
</InstancedMesh>

