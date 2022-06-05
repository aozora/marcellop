<script lang="ts">
import {
  AmbientLight,
  Canvas,
  PerspectiveCamera,
  PointLight,
  Fog
} from "threlte";
import Tetra from "./Tetra.svelte";
import Swarm from "./Swarm.svelte";
import { useWindowScroll } from "../hooks/useWindowScroll";

const { y } = useWindowScroll();
let swarmYposition;
y.subscribe(value => {
  swarmYposition = value;
});

</script>

<div class="canvas-container">
  <Canvas shadows >
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
    <Fog color={'#f0f0f0'} />
    <PerspectiveCamera fov={75} near={10} far={150} position={{ x: 0, y: -2, z: 50 }} />

    <Tetra />

    <Swarm position={{x: 0, y: swarmYposition / 4, z:0}} />

  </Canvas>
</div>

