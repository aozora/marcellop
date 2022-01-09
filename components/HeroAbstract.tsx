import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import { Color, Object3D } from 'three';
// import { useControls } from 'leva';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';

const Swarm = ({ count, ...props }): JSX.Element => {
  const mesh = useRef();
  const [dummy] = useState(() => new Object3D());

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.002 + Math.random() / 200;
      const xFactor = -40 + Math.random() * 80;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: 0,
        my: 0
      });
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

const Loading = () => {
  return <h2>Loading...</h2>;
};

const HeroAbstract = () => {
  // const { count } = useControls({
  //   count: {
  //     value: 150,
  //     min: 0,
  //     max: 1000,
  //     step: 10
  //   }
  // });
  // const { focusDistance, focalLength, bokehScale } = useControls({
  //   focusDistance: {
  //     min: 0,
  //     max: 4,
  //     value: 2
  //   },
  //   focalLength: {
  //     min: 0,
  //     max: 1,
  //     value: 0.1
  //   },
  //   bokehScale: {
  //     min: 0,
  //     max: 10,
  //     value: 0.2
  //   }
  // });
  const count = 150;
  const focusDistance = 2,
    focalLength = 1,
    bokehScale = 0.2;

  return (
    <Suspense fallback={<Loading />}>
      <Canvas
        mode="concurrent"
        shadows={true}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        camera={{
          fov: 75,
          position: [0, 0, 40],
          near: 10,
          far: 150
        }}
        // onCreated={state => {
        //   console.log({ state });
        //   state.events.connect(dom.current);
        // }}
      >
        <color attach="background" args={['#f0f0f0']} />
        <fog attach="fog" args={['red', 60, 100]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[100, 10, -50]} intensity={20} castShadow={true} />
        <pointLight position={[-100, -100, -100]} intensity={10} color="black" />
        <Environment preset="studio" />

        {/*<ContactShadows*/}
        {/*  rotation={[Math.PI / 2, 0, 0]}*/}
        {/*  position={[0, -30, 0]}*/}
        {/*  opacity={0.6}*/}
        {/*  width={130}*/}
        {/*  height={130}*/}
        {/*  blur={1}*/}
        {/*  far={40}*/}
        {/*>*/}
        {/*  {null}*/}
        {/*</ContactShadows>*/}

        <EffectComposer multisampling={0}>
          <DepthOfField focusDistance={focusDistance} focalLength={focalLength} bokehScale={bokehScale} />
        </EffectComposer>

        <Swarm count={count} position={[0, 10, 0]} />

        <Preload all />
      </Canvas>
    </Suspense>
  );
};

export default HeroAbstract;
