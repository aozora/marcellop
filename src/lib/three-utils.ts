// import type { Particle } from './types';
// import type { Position, Rotation, Scale } from 'threlte';
//
// export const getParticles = (count: number): Array<Particle> => {
// 	const temp = [];
// 	for (let i = 0; i < count; i++) {
// 		const t = Math.random() * 100;
// 		const factor = 20 + Math.random() * 100;
// 		const speed = 0.002 + Math.random() / 200;
// 		const xFactor = -40 + Math.random() * 80;
// 		const yFactor = -30 + Math.random() * 40;
// 		const zFactor = -20 + Math.random() * 40;
//
// 		const rotation: Rotation = { x: 0, y: 0, z: 0 };
// 		const position: Position = { x: 0, y: 0, z: 0 };
// 		const scale: Scale = { x: 0, y: 0, z: 0 };
//
// 		temp.push({
// 			t,
// 			factor,
// 			speed,
// 			xFactor,
// 			yFactor,
// 			zFactor,
// 			mx: 0,
// 			my: 0,
// 			position,
// 			rotation,
// 			scale
// 		});
// 	}
//
// 	return temp;
// };
