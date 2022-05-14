// import * as THREE from 'three';
// import type { Particle } from '../types';
//
// const browser = typeof window !== 'undefined';
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 150);
// let renderer;
// const clock = new THREE.Clock();
//
// /**
//  * Preparing the scene
//  */
// const fog = new THREE.Fog('red', 60, 100); // try 1,15
// scene.fog = fog;
//
// /**
//  * LIGHTS
//  */
// const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
// scene.add(ambientLight);
//
// const pointLight1 = new THREE.PointLight('#ffffff', 20);
// pointLight1.castShadow = true;
// pointLight1.shadow.mapSize.width = 1024;
// pointLight1.shadow.mapSize.height = 1024;
// pointLight1.position.set(100, 10, -50);
// scene.add(pointLight1);
//
// const pointLight2 = new THREE.PointLight('#6968AA', 10);
// pointLight2.castShadow = true;
// pointLight2.shadow.mapSize.width = 1024;
// pointLight2.shadow.mapSize.height = 1024;
// pointLight2.position.set(-100, -100, -100);
// scene.add(pointLight2);
//
// // camera.position.z = 5;
//
// /**
//  * Create the instances
//  */
// const count = 150;
// const getParticles = (): Array<Particle> => {
// 	const temp = [];
// 	for (let i = 0; i < count; i++) {
// 		const t = Math.random() * 100;
// 		const factor = 20 + Math.random() * 100;
// 		const speed = 0.002 + Math.random() / 200;
// 		const xFactor = -40 + Math.random() * 80;
// 		const yFactor = -30 + Math.random() * 40;
// 		const zFactor = -20 + Math.random() * 40;
//
// 		temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
// 	}
//
// 	return temp;
// };
// const particles: Array<Particle> = getParticles();
//
// const dummy = new THREE.Object3D();
// const geometry = new THREE.TetrahedronBufferGeometry(1);
// const material = new THREE.MeshStandardMaterial({ roughness: 0, metalness: 0, color: '#0f0f0f' });
// const mesh = new THREE.InstancedMesh(geometry, material, count);
// scene.add(mesh);
//
// function updateParticles() {
// 	particles.forEach((particle, i) => {
// 		let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
// 		t = particle.t += speed / 2;
// 		const time = clock.getElapsedTime();
//
// 		const a = Math.cos(t) + Math.sin(t * 1) / 10;
// 		const b = Math.sin(t) + Math.cos(t * 2) / 10;
// 		const s = Math.max(1.5, Math.cos(t) * 5);
// 		// particle.mx += (state.mouse.x * state.viewport.width - particle.mx) * 0.02;
// 		// particle.my += (state.mouse.y * state.viewport.height - particle.my) * 0.02;
//
// 		// position
// 		dummy.position.set(
// 			(particle.mx / 10) * a +
// 				xFactor +
// 				Math.cos((t / 10) * factor) +
// 				(Math.sin(t * 1) * factor) / 10,
// 			(particle.my / 10) * b +
// 				yFactor +
// 				Math.sin((t / 10) * factor) +
// 				(Math.cos(t * 2) * factor) / 10,
// 			(particle.my / 10) * b +
// 				zFactor +
// 				Math.cos((t / 10) * factor) +
// 				(Math.sin(t * 3) * factor) / 10
// 		);
//
// 		// rotation
// 		dummy.rotation.set(
// 			((Math.cos(time / 4) / 2) * xFactor) / 3,
// 			((Math.sin(time / 4) / 2) * yFactor) / 3,
// 			((Math.cos(time / 1.5) / 2) * zFactor) / 3
// 		);
//
// 		// scale
// 		dummy.scale.set(s, s, s);
//
// 		dummy.updateMatrix();
//
// 		mesh.setMatrixAt(i, dummy.matrix);
// 	});
//
// 	mesh.instanceMatrix.needsUpdate = true;
// }
//
// // const offset = (count - 1) / 2;
// //
// // for (let i = 0; i < count; i++) {
// // 	dummy.position.set(offset - i, 0, 0);
// // 	dummy.updateMatrix();
// // 	mesh.setMatrixAt(i, dummy.matrix);
// // }
//
// /**
//  * Rendering
//  */
// const animate = () => {
// 	// requestAnimationFrame(animate);
// 	// cube.rotation.x += 0.01;
// 	// cube.rotation.y += 0.01;
// 	updateParticles();
// 	renderer.render(scene, camera);
// };
//
// const resize = () => {
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// };
//
// export const createScene = (el) => {
// 	renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
// 	renderer.shadowMap.enabled = true;
// 	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// 	renderer.setClearColor('#f0f0f0');
// 	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//
// 	resize();
// 	// animate();
// 	renderer.setAnimationLoop(animate);
// };
//
// export const destroyScene = () => {
// 	browser && window.removeEventListener('resize', resize);
// };
//
// browser && window.addEventListener('resize', resize);
