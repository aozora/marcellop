<script lang="ts">
import {
  Mesh, Rotation,
  useFrame
} from "threlte";
import { MeshStandardMaterial, TetrahedronGeometry } from "three";

let rotation: Rotation = { x: 0, y: 0, z: 0 };
const xFactor = -40 + Math.random() * 80;
const yFactor = -30 + Math.random() * 40;
const zFactor = -20 + Math.random() * 40;

useFrame((context) => {
  const time = context.clock.getElapsedTime();
  // console.log(context.pointer);

  rotation = {
    x: ((Math.cos(time / 4) / 2) * xFactor) / 2,
    y: ((Math.sin(time / 4) / 2) * yFactor) / 2,
    z: ((Math.cos(time / 1.5) / 2) * zFactor) / 2
  };
});

</script>

<Mesh castShadow
      receiveShadow
      geometry={new TetrahedronGeometry()}
      material={new MeshStandardMaterial({color: '#0f0f0f', roughness:0, metalness:0})}
      position={[12, -3, 35]}
      rotation={rotation}
/>
