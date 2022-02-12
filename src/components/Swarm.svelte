<script lang="ts">
import { MeshInstance, Size, useFrame } from "threlte";
import { Mesh, MeshStandardMaterial, Object3D, TetrahedronGeometry } from "three";

let count;
let position;
const dummy = new Object3D();

const getParticles = () => {
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

const particles = getParticles();

const material = new MeshStandardMaterial({
  wireframe: true,
  color: "black"
});
const geometry = new TetrahedronGeometry(1);
const mesh = new Mesh(geometry, material);


useFrame((state) => {
  particles.forEach((particle, i) => {
    let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
    t = particle.t += speed / 2;
    const time = state.clock.getElapsedTime();

    const a = Math.cos(t) + Math.sin(t * 1) / 10;
    const b = Math.sin(t) + Math.cos(t * 2) / 10;
    const s = Math.max(1.5, Math.cos(t) * 5);

    let viewportSize:Size;
    state.size.subscribe(s => {
      viewportSize = s;
    });

    state.pointer.subscribe(vector => {
      particle.mx += (vector.x * viewportSize.width - particle.mx) * 0.02;
      particle.my += (vector.y * viewportSize.height - particle.my) * 0.02;
    });

    // position
    dummy.position.set(
      (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
      (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
      (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
    );

    // rotation
    dummy.rotation.set(
      ((Math.cos(time / 4) / 2) * xFactor) / 3,
      ((Math.sin(time / 4) / 2) * yFactor) / 3,
      ((Math.cos(time / 1.5) / 2) * zFactor) / 3
    );

    // scale
    dummy.scale.set(s, s, s);

    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  });

  mesh.instanceMatrix.needsUpdate = true;
});

</script>

<MeshInstance {mesh}
              castShadow
              receiveShadow
              rotation={{ x: 90 * (Math.PI / 180) }} />

<!--<instancedMesh ref={mesh} args={[null, null, count]} castShadow receiveShadow {...props}>-->
<!--  <tetrahedronGeometry radius={1} />-->
<!--  <meshStandardMaterial attach="material" roughness={0} color={new Color('#0f0f0f')} />-->
<!--</instancedMesh>-->
