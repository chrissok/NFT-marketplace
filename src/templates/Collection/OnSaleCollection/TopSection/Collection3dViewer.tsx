"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import Viewer3d from "@/components/3dViewer/Viewer3d";

function Collection3dViewer({ vrmSrc }: { vrmSrc?: string }) {
  const orbitRef = useRef<any>();

  const updateCameraAndControls = async (center: any, distance: number) => {
    const camera = orbitRef.current?.object;
    if (camera) {
      const { Vector3 } = await import("three");

      const newPosition = center.clone().add(new Vector3(0, 0, distance * 0.5)); // Adjust multiplier as needed for best framing
      camera.position.copy(newPosition);
      if (orbitRef.current) {
        orbitRef.current.target = center;
        if (orbitRef.current.update) orbitRef.current.update();
        camera.lookAt(center);
      }
    }
  };

  const [animationUrl] = useState<string | null>(
    "/animations/kneeling-idle.fbx"
  );

  const [selectedVRM] = useState(vrmSrc || "/vrms/test.vrm");

  return (
    <>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight />
        <Environment preset="city" />
        <Viewer3d
          updateCameraAndControls={updateCameraAndControls}
          url={selectedVRM}
          animationUrl={animationUrl}
          floorEnabled={false}
        />
        <OrbitControls ref={orbitRef} enableZoom={false} enabled={false} />
      </Canvas>
    </>
  );
}

export default Collection3dViewer;
