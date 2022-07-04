import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import styles from "../styles/Model.module.css";

function Jordan() {
  const group = useRef();
  const { nodes, materials } = useGLTF("/jordan.gltf");
  useFrame((state, delta) => (group.current.rotation.y += 0.025));
  return (
    <group ref={group} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[10, 0, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-100, 100, 100]}
          >
            <mesh
              geometry={nodes.Object_2001_main_object001mat003_0.geometry}
              material={materials["main_object.001.mat.003"]}
            />
          </group>
          <group rotation={[-Math.PI, 0, 0]} scale={1900}>
            <mesh
              geometry={nodes.Object_2_main_object001mat_0.geometry}
              material={materials["main_object.001.mat"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

export default function Model() {
  return (
    <Canvas className={styles.container}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <Jordan />
    </Canvas>
  );
}
