import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, Preload } from '@react-three/drei';
import useStore from '../../helpers/store';
import React, { useEffect, useRef } from 'react';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';

const LControl = () => {
  const dom = useStore(state => state.dom);
  const control = useRef(null);

  useEffect(() => {
    if (control) {
      dom.current.style['touch-action'] = 'none';
    }
  }, [dom, control]);
  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} />;
};
const LCanvas = ({ children }) => {
  const dom = useStore(state => state.dom);
  const focusDistance = 2,
    focalLength = 1,
    bokehScale = 0.2;

  return (
    <Canvas
      shadowMap
      shadow-mapSize-height={512}
      shadow-mapSize-width={512}
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
      <pointLight position={[100, 10, -50]} intensity={20} castShadow />
      <pointLight position={[-100, -100, -100]} intensity={10} color="black" />

      {/*<LControl />*/}
      <Environment preset="studio" />

      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -30, 0]}
        opacity={0.6}
        width={130}
        height={130}
        blur={1}
        far={40}
      />

      <EffectComposer multisampling={0}>
        <DepthOfField focusDistance={focusDistance} focalLength={focalLength} bokehScale={bokehScale} />
      </EffectComposer>

      {children}

      <Preload all />
    </Canvas>
  );
};

export default LCanvas;
