import airpodsModel from "@/assets/models/airpods_pro.glb";
import { useGLTF } from "@react-three/drei/native";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { Asset } from "expo-asset";
import React, { memo, Suspense, useMemo, useRef } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import * as THREE from "three";

type Transform = {
  rotationSpeed: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
};

type AirpodsModelProps = {
  height?: number;
  scale?: number;
  style?: ViewStyle;
  width?: number;
};

const MODEL_ASSET = airpodsModel as string;

void Asset.loadAsync(MODEL_ASSET);
useGLTF.preload(MODEL_ASSET);

function Model({ transformRef }: { transformRef: React.RefObject<Transform> }) {
  const gltf = useGLTF(MODEL_ASSET);
  const ref = useRef<THREE.Group>(null);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const modelOffset = useMemo(() => {
    const center = new THREE.Box3()
      .setFromObject(scene)
      .getCenter(new THREE.Vector3());

    return [-center.x, -center.y, -center.z] as const;
  }, [scene]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = transformRef.current;
      const time = clock.getElapsedTime();

      ref.current.rotation.x = t.rotX;
      ref.current.rotation.y = t.rotY + time * t.rotationSpeed;
      ref.current.rotation.z = t.rotZ;
      ref.current.scale.setScalar(t.scale);
    }
  });

  return (
    <group ref={ref}>
      <group position={modelOffset}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

function AirpodsModel({
  height = 36,
  scale = 0.4,
  style,
  width = 60,
}: AirpodsModelProps) {
  const transformRef = useRef<Transform>({
    rotationSpeed: 0.85,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    scale,
  });

  return (
    <View
      style={[styles.container, { height, width }, style]}
      pointerEvents="none"
    >
      <Canvas
        camera={{
          position: [0, 0.15, 4],
          fov: 34,
        }}
      >
        <ambientLight intensity={1.25} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <directionalLight position={[-3, 1, 2]} intensity={0.55} />

        <Suspense fallback={null}>
          <Model transformRef={transformRef} />
        </Suspense>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});

export default memo(AirpodsModel);
