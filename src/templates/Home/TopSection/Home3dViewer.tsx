"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import Viewer3d from "@/components/3dViewer/Viewer3d";
// import FeaturedTabs from "@/components/Tabs/FeaturedTabs";
// import { TOP_FEATURED_VRMS } from "@/constants/Home/tabs";

function Home3dViewer({ vrmSrc }: { vrmSrc?: string }) {
  const orbitRef = useRef<any>();

  const updateCameraAndControls = async (center: any, distance: number) => {
    const camera = orbitRef.current?.object;
    if (camera) {
      const { Vector3 } = await import("three");

      const newPosition = center.clone().add(new Vector3(0, 0, distance * 0.6)); // Adjust multiplier as needed for best framing
      camera.position.copy(newPosition);
      if (orbitRef.current) {
        orbitRef.current.target = center;
        if (orbitRef.current.update) orbitRef.current.update();
        camera.lookAt(center);
      }
    }
  };

  const [animationUrl] = useState<string | null>("/animations/idle.fbx");

  const [selectedVRM] = useState(vrmSrc || "/vrms/test.vrm");

  return (
    <>
      <Canvas onContextMenu={(e) => e.preventDefault()}>
        <ambientLight intensity={0.1} />
        <directionalLight />
        <Environment preset="city" />
        <Viewer3d
          updateCameraAndControls={updateCameraAndControls}
          url={selectedVRM}
          animationUrl={animationUrl}
          floorEnabled={false}
        />
        <OrbitControls
          ref={orbitRef}
          enableZoom={false}
          enablePan={false} // Disable panning
          minPolarAngle={Math.PI / 2} // Lock vertical movement
          maxPolarAngle={Math.PI / 2} // Lock vertical movement
        />
      </Canvas>
      {/* <div className="absolute bottom-[-8%] left-[-20%] w-[60vw]">
        <FeaturedTabs tabs={TOP_FEATURED_VRMS} onTabChange={setSelectedVRM} />
      </div> */}
    </>
  );
}

export default Home3dViewer;
