import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { PointLightHelper } from 'three';

const HeroAbstractLights = (): JSX.Element => {
  const pointLight1Ref = useRef();
  const pointLight2Ref = useRef();

  // lights helpers
  // useHelper(pointLight1Ref, PointLightHelper, 1, 'red');
  // useHelper(pointLight2Ref, PointLightHelper, 1, 'cyan');

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight
        ref={pointLight1Ref}
        position={[100, 10, -50]}
        intensity={20}
        castShadow={true}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <pointLight ref={pointLight2Ref} position={[-100, -100, -100]} intensity={10} color="#6968AA" />
    </>
  );
};

export default HeroAbstractLights;
