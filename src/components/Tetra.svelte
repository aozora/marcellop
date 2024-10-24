<script lang="ts">
import {
  Mesh, type Position, type Rotation, type Scale,
  useFrame
} from "@threlte/core";
import { MeshStandardMaterial, TetrahedronGeometry, Vector3 } from "three";
import GUI from "lil-gui";

const gui = new GUI();

/**
 * PROPS
 */

  interface Props {
    // export let position: Position = new Vector3(12, -3, 35);
    position?: Position;
    scale?: Scale;
  }

  let { position = $bindable(new Vector3(7, -2, 39)), scale = new Vector3(0, 0, 0) }: Props = $props();

gui.add(position, "x", -100, 100, 1).onChange(value => {
  position.x = value;
  position = position;
});
gui.add(position, "y", -100, 100, 1).onChange(value => {
  position.y = value;
  position = position;
});
gui.add(position, "z", -100, 100, 1).onChange(value => {
  position.z = value;
  position = position;
});

let rotation: Rotation = $state({ x: 0, y: 0, z: 0 });
const xFactor = -40 + Math.random() * 80;
const yFactor = -30 + Math.random() * 40;
const zFactor = -20 + Math.random() * 40;

useFrame((context) => {
  const time = context.clock.getElapsedTime();

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
      material={new MeshStandardMaterial({color: '#696767', roughness:0, metalness:0.1})}
      position={position}
      rotation={rotation}
/>
