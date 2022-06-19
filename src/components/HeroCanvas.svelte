<script lang="ts">
import {
  AmbientLight,
  PerspectiveCamera,
  PointLight,
  Fog, type Position, type Scale, useThrelte, Pass, useFrame, OrbitControls
} from "threlte";
import Tetra from "./Tetra.svelte";
import Swarm from "./Swarm.svelte";
import { useWindowScroll } from "../hooks/useWindowScroll";
import { Color, Vector3 } from "three";
import gsap from "gsap";
import { aboutSectionIsInView } from "$lib/stores/home-scroll-store";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
// import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";

/**
 * Canvas setup
 */
const { scene, camera } = useThrelte();
scene.background = new Color("#ffffff");

/**
 * Scroll position of swarm
 */
const { y } = useWindowScroll();
let swarmYposition;
y.subscribe(value => {
  // console.log({ value });
  swarmYposition = value;
});

/**
 * Scroll position of Tetra
 */

// initial position
let tetraPosition: Position = new Vector3(12, -3, 35);
let tetraScale: Scale = new Vector3(0, 0, 0);
let scrolled = false;
/*
aboutSectionIsInView.subscribe(isInView => {
  if (isInView && !scrolled) {
    gsap.to(tetraScale, {
      duration: 1,
      // ease: 'power2.inOut',
      x: "+=1",
      y: "+=1",
      z: "+=1"
    });

    scrolled = true;
  }
});*/
</script>

<!--<div class="canvas-container">-->
<!--  <Canvas shadows>-->
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
<PerspectiveCamera fov={75} near={10} far={150} position={{ x: 0, y: -2, z: 50 }}/>

<!--<Tetra position={tetraPosition} scale={tetraScale} />-->
<Tetra />

<Swarm position={{x: 0, y: swarmYposition / 4, z:0}} />

<!--<Pass pass={new BokehPass(scene, $camera, {-->
<!--      focus: 		0.72,-->
<!--      aperture:	0.5,-->
<!--      maxblur:	.01,-->
<!--      width: window.innerWidth,-->
<!--      height: window.innerHeight-->
<!--    })} />-->
<!--<Pass pass={new AfterimagePass(0.96)} />-->
<!--<Pass pass={new UnrealBloomPass(-->
<!--	new Vector2( window.innerWidth, window.innerHeight ),-->
<!--  1.5,-->
<!--	 0,-->
<!--	 0-->
<!--)} />-->


