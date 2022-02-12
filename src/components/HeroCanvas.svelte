<script lang="ts">
import {
  AmbientLight,
  Canvas,
  DirectionalLight,
  HemisphereLight,
  Mesh, MeshInstance,
  OrbitControls,
  PerspectiveCamera, PointLight, useFrame
} from "threlte";
import Tetra from "./Tetra.svelte";


</script>

<div class="canvas-container">
  <Canvas shadows class="Canvas">
    <AmbientLight intensity={0.5} />
    <PointLight position={{ x: 100, y: 10, z:-50 }}
                intensity={20}
                castShadow={true}
                shadow={{
                  mapSize: [1024,1024]
                }} />
    <PointLight position={{ x: -100, y: -100, z:-100 }} intensity={10} color="#6968AA" />
    <Tetra />
  </Canvas>
</div>
