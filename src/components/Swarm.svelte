<script lang="ts">
import { Mesh, Position, Rotation, Scale, useFrame } from "threlte";
import { Mesh as ThreeMesh, MeshStandardMaterial, TetrahedronGeometry } from "three";
import type { Particle } from "../lib/types";

// export let mesh: ThreeMesh;
export let particle: Particle;
let rotation: Rotation = { x: 0, y: 0, z: 0 };
let position: Position = { x: 0, y: 0, z: 0 };
let scale: Scale = { x: 0, y: 0, z: 0 };

useFrame((state) => {
  let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
  t = particle.t += speed / 2;
  const time = state.clock.getElapsedTime();

  const a = Math.cos(t) + Math.sin(t * 1) / 10;
  const b = Math.sin(t) + Math.cos(t * 2) / 10;
  const s = Math.max(1.5, Math.cos(t) * 5);

  // let viewportSize: Size;
  // state.size.subscribe(s => {
  //   viewportSize = s;
  // });

  // state.pointer.subscribe(vector => {
  //   particle.mx += (vector.x * viewportSize.width - particle.mx) * 0.02;
  //   particle.my += (vector.y * viewportSize.height - particle.my) * 0.02;
  // });

  // position
  position = {
    x: (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
    y: (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
    z: (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
  };

  // rotation
  rotation = {
    x: ((Math.cos(time / 4) / 2) * xFactor) / 3,
    y: ((Math.sin(time / 4) / 2) * yFactor) / 3,
    z: ((Math.cos(time / 1.5) / 2) * zFactor) / 3
  };

  // scale
  scale = { x: s, y: s, z: s };

  // dummy.updateMatrix();
  // mesh.setMatrixAt(i, dummy.matrix);
  //
  // mesh.instanceMatrix.needsUpdate = true;
});

</script>

<Mesh
  material={new MeshStandardMaterial({color: '#0f0f0f', roughness:0, metalness:0})}
  geometry={new TetrahedronGeometry(1)}
  castShadow
  receiveShadow
  position={position}
  rotation={rotation}
  scale={scale} />
