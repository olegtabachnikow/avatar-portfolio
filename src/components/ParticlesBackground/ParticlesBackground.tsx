import { FC, useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import vertexShader from '../../shaders/particles/vertex.glsl';
import fragmentShader from '../../shaders/particles/fragment.glsl';
import type { ParticlesType } from '../../types';
import useStore from '@/store/store';

const initialParticles: ParticlesType = {
  geometry: new THREE.BufferGeometry(),
  material: new THREE.ShaderMaterial(),
  count: 2000,
  maxCount: 0,
  colorA: '#ff7300',
  positions: [] as THREE.Float32BufferAttribute[],
  colorB: '#0091ff',
  index: 0,
};

let particles = initialParticles;

const ParticlesBackground: FC = () => {
  const [isStarted, setIsStarted] = useStore((state) => [
    state.isStarted,
    state.setIsStarted,
  ]);
  const pointsRef = useRef<THREE.Points>(null);
  const { scene } = useGLTF('./modelsForParticles1.glb');
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  };
  useMemo(
    () =>
      scene.children.map((_) => {
        particles = initialParticles;
        particles.index = 0;

        // Positions
        const positions = scene.children.map(
          (child: any) => child.geometry.attributes.position
        );
        particles.maxCount = 0;
        for (const position of positions) {
          if (position.count > particles.maxCount) {
            particles.maxCount = position.count;
          }
        }
        particles.positions = [];
        for (const position of positions) {
          const originalArray = position.array;
          const newArray = new Float32Array(particles.maxCount * 3);
          for (let i = 0; i < particles.maxCount; i++) {
            const i3 = i * 3;
            if (i3 < originalArray.length) {
              newArray[i3] = originalArray[i3];
              newArray[i3 + 1] = originalArray[i3 + 1];
              newArray[i3 + 2] = originalArray[i3 + 2];
            } else {
              const randomIndex =
                Math.floor(position.count * Math.random()) * 3;
              newArray[i3] = originalArray[randomIndex + 0];
              newArray[i3 + 1] = originalArray[randomIndex + 1];
              newArray[i3 + 2] = originalArray[randomIndex + 2];
            }
          }
          particles.positions.push(
            new THREE.Float32BufferAttribute(newArray, 3)
          );
        }

        // Geometry
        const sizesArray = new Float32Array(particles.maxCount);
        for (let i = 0; i < particles.maxCount; i++) {
          sizesArray[i] = Math.random();
        }

        particles.geometry = new THREE.BufferGeometry();
        particles.geometry.setAttribute(
          'position',
          particles.positions[particles.index]
        );
        particles.geometry.setAttribute(
          'aPositionTarget',
          particles.positions[1]
        );
        particles.geometry.setAttribute(
          'aSize',
          new THREE.BufferAttribute(sizesArray, 1)
        );

        // Material
        particles.material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uSize: new THREE.Uniform(0.4),
            uResolution: new THREE.Uniform(
              new THREE.Vector2(
                sizes.width * sizes.pixelRatio,
                sizes.height * sizes.pixelRatio
              )
            ),
            uProgress: new THREE.Uniform(0),
            uColorA: new THREE.Uniform(new THREE.Color(particles.colorA)),
            uColorB: new THREE.Uniform(new THREE.Color(particles.colorB)),
          },
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        // Methods
        particles.morph = (index: number) => {
          particles.geometry.attributes.position =
            particles.positions[particles.index];
          particles.geometry.attributes.aPositionTarget =
            particles.positions[index];

          // Animate uProgress
          gsap.fromTo(
            particles.material.uniforms.uProgress,
            { value: 0 },
            { value: 1, duration: 3, ease: 'expo.out' }
          );

          // Save index
          particles.index = index;
        };
      }),
    [scene, sizes.width, sizes.height, sizes.pixelRatio]
  );

  useEffect(() => {
    if (particles.morph) {
      !isStarted ? particles.morph(1) : particles.morph(0);
    }
  }, [isStarted]);

  return (
    <points
      ref={pointsRef}
      geometry={particles.geometry}
      material={particles.material}
    />
  );
};

export default ParticlesBackground;

useGLTF.preload('./modelsForParticles1.glb');
