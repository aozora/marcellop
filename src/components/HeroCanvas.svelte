<script lang="ts">
import {
  AmbientLight,
  Canvas,
  Group,
  PerspectiveCamera, PointLight
} from "threlte";
import Tetra from "./Tetra.svelte";
import Swarm from "./Swarm.svelte";
import type { Particle } from "../lib/types";
import { useWindowScroll } from "../hooks/useWindowScroll";

const count = 150;
const getParticles = (): Array<Particle> => {
  const temp = [];
  for (let i = 0; i < count; i++) {
    const t = Math.random() * 100;
    const factor = 20 + Math.random() * 100;
    const speed = 0.002 + Math.random() / 200;
    const xFactor = -40 + Math.random() * 80;
    const yFactor = -30 + Math.random() * 40;
    const zFactor = -20 + Math.random() * 40;

    temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
  }

  return temp;
};

const particles: Array<Particle> = getParticles();

const { x, y } = useWindowScroll();


</script>

<div class="canvas-container">
  <Canvas shadows>
    <AmbientLight intensity={0.5} />
    <PointLight position={{ x: 100, y: 10, z:-50 }}
                intensity={20}
                shadow={{
                  mapSize: [1024,1024]
                }} />
    <PointLight position={{ x: -100, y: -100, z:-100 }}
                intensity={10}
                color="#6968AA"
                shadow={{
                  mapSize: [1024,1024]
                }} />
    />

    <PerspectiveCamera fov={75} near={10} far={150} position={{ x: 0, y: 0, z: 50 }} />

    <Tetra />

    <Group>
      {#each particles as particle}
        <Swarm {particle} />
      {/each}
    </Group>

  </Canvas>
</div>
