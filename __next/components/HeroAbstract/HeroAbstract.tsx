import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Preload, ScrollControls, Scroll, Tetrahedron, Box, useScroll } from '@react-three/drei';
import { Color, Object3D } from 'three';
import { useControls } from 'leva';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';
import HeroAbstractLights from './HeroAbstractLights';

const Swarm = ({ count, ...props }) => {
  const mesh = useRef();
  const [dummy] = useState(() => new Object3D());

  const particles = useMemo(() => {
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
  }, [count]);

  useFrame((state, delta) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const time = state.clock.getElapsedTime();

      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(1.5, Math.cos(t) * 5);
      particle.mx += (state.mouse.x * state.viewport.width - particle.mx) * 0.02;
      particle.my += (state.mouse.y * state.viewport.height - particle.my) * 0.02;

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
      // @ts-ignore
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    // @ts-ignore
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]} castShadow receiveShadow {...props}>
      <tetrahedronGeometry radius={1} />
      <meshStandardMaterial attach="material" roughness={0} color={new Color('#0f0f0f')} />
    </instancedMesh>
  );
};

const Tetra = ({ ...props }) => {
  const mesh = useRef();
  //
  // const particle = useMemo(() => {
  //   const temp = [];
  //   const t = Math.random() * 100;
  //   const factor = 20 + Math.random() * 100;
  //   const speed = 0.002 + Math.random() / 200;
  //   const xFactor = -40 + Math.random() * 80;
  //   const yFactor = -30 + Math.random() * 40;
  //   const zFactor = -20 + Math.random() * 40;
  //   temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
  //
  //   return temp;
  // }, []);

  const xFactor = -40 + Math.random() * 80;
  const yFactor = -30 + Math.random() * 40;
  const zFactor = -20 + Math.random() * 40;

  const data = useScroll();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // rotation
    // @ts-ignore
    mesh.current.rotation.set(
      ((Math.cos(time / 4) / 2) * xFactor) / 2,
      ((Math.sin(time / 4) / 2) * yFactor) / 2,
      ((Math.cos(time / 1.5) / 2) * zFactor) / 2
    );

    // const { offset, delta } = data;
    // console.log({ offset });
    // console.log({ delta });

    // scale
    // @ts-ignore
    // mesh.current.scale.set(1 + data.offset * 3, 1 + data.offset * 3, 1 + data.offset * 3);

    // mesh.current.position.y = MathUtils.damp(mesh.current.position.y, 0, 4, delta);
  });

  // @ts-ignore
  return (
    // <mesh ref={mesh} {...props} position={[12, -3, 35]} castShadow={true} receiveShadow={true}>
    //   <tetrahedronBufferGeometry radius={1} />
    //   <meshStandardMaterial attach="material" roughness={0} color={new Color('#0f0f0f')} />
    // </mesh>
    <Tetrahedron ref={mesh} {...props} position={[12, -3, 35]} castShadow receiveShadow>
      <meshStandardMaterial attach="material" roughness={0} color={new Color('#0f0f0f')} />
    </Tetrahedron>
  );
};

const Composition = () => {
  const count = 150;
  const focusDistance = 2;
  const focalLength = 1;
  const bokehScale = 0.2;

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const y = Math.round(scrollY / window.innerHeight);
      const scrollTop = document.documentElement.scrollTop;

      const containerLength = window.innerHeight;
      const scrollLength = scrollTop;
      const scrollThreshold = scrollLength - containerLength;

      console.log({ scrollTop });
      console.log({ scrollY });
      console.log({ y });
      console.log({ scrollThreshold });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <color attach="background" args={['#f0f0f0']} />
      <fog attach="fog" args={['red', 60, 100]} />

      <HeroAbstractLights />

      {/*<Scroll>*/}
      <Swarm count={count} position={[0, 10, 0]} />
      {/*</Scroll>*/}

      <Tetra position={[0, -10, 20]} />

      <Environment preset="studio" />

      <EffectComposer multisampling={0}>
        <DepthOfField focusDistance={focusDistance} focalLength={focalLength} bokehScale={bokehScale} />
      </EffectComposer>

      <Preload all />

      {/*<OrbitControls position={[0, 0, 0]} makeDefault />*/}
    </>
  );
};

const HeroAbstract = () => {
  return (
    <Suspense fallback={null}>
      <Canvas
        shadows
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        camera={{ fov: 75, position: [0, 0, 50], near: 10, far: 150 }}
      >
        {/*<ScrollControls pages={2}>*/}
        <Composition />
        {/*</ScrollControls>*/}
      </Canvas>
    </Suspense>
  );
};

export default HeroAbstract;
