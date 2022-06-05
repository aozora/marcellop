<script lang="ts">
import { type Size, useFrame, InstancedMesh, Instance, type Position, Pass, useThrelte } from "threlte";
import { MeshStandardMaterial, TetrahedronGeometry, Vector2 } from "three";
import type { Particle } from "../lib/types";
import { getParticles } from "../lib/three-utils";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";


/**
 * PROPS
 */
export let position: Position;

let particles: Array<Particle> = getParticles(150);

const material = new MeshStandardMaterial({ color: "#696767", roughness: 0, metalness: 0.1 });
const geometry = new TetrahedronGeometry(1);
const { scene, camera } = useThrelte();

useFrame((state) => {
  particles.forEach((particle, i) => {
    let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
    t = particle.t += speed / 2;
    const time = state.clock.getElapsedTime();

    const a = Math.cos(t) + Math.sin(t * 1) / 10;
    const b = Math.sin(t) + Math.cos(t * 2) / 10;
    const s = Math.max(1.5, Math.cos(t) * 5);

    let viewportSize: Size;
    state.size.subscribe(s => {
      viewportSize = s;
    });

    // console.log(state.pointer)
    state.pointer.subscribe(vector => {
      particle.mx += (vector.x * viewportSize.width - particle.mx) * 0.02;
      particle.my += (vector.y * viewportSize.height - particle.my) * 0.02;
    });

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

</script>


<InstancedMesh {geometry} {material} position={position}>
  {#each particles as particle, index}
    <Instance position={particle.position}
              rotation={particle.rotation}
              scale={particle.scale} />
  {/each}
</InstancedMesh>

<Pass pass={new BokehPass(scene, $camera, {
      focus: 		0.72,
      aperture:	0.5,
      maxblur:	.01,
      width: window.innerWidth,
       height: window.innerHeight
    })} />
<!--<Pass pass={new AfterimagePass(0.96)} />-->
<!--<Pass pass={new UnrealBloomPass(-->
<!--	new Vector2( window.innerWidth, window.innerHeight ),-->
<!--  1.5,-->
<!--	 0,-->
<!--	 0-->
<!--)} />-->
