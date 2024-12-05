"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import Viewer3d from "@/components/3dViewer/Viewer3d";
import { useSearchParams } from "next/navigation";
import MouseSVG from "./MouseSVG";

type AssetPage3dViewerProps = {
  itemURL: string;
  isVRM: boolean;
};

function AssetPage3dViewer({ itemURL, isVRM }: AssetPage3dViewerProps) {
  const orbitRef = useRef<any>();
  const [animationURL, setAnimationURL] = useState("/animations/idle.fbx");
  const [firstClick, setFirstClick] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const animationParam = searchParams.get("animation");
    if (animationParam) {
      setAnimationURL(`/animations/${animationParam}.fbx`);
    }
  }, [searchParams]);

  const updateCameraAndControls = async (center: any, distance: number) => {
    const camera = orbitRef.current?.object;
    if (camera) {
      const newPosition = center
        .clone()
        .add(new Vector3(0, 0, distance * (isVRM ? 0.6 : 0.1))); // Adjust multiplier as needed for best framing
      camera.position.copy(newPosition);
      if (orbitRef.current) {
        orbitRef.current.target = center;
        if (orbitRef.current.update) orbitRef.current.update();
        camera.lookAt(center);
      }
    }
  };

  return (
    <>
      {loaded && !firstClick && (
        <div className="absolute flex flex-col px-[6px] py-[10px] justify-center w-[89px] items-center rounded-xl bg-blur-dark-3 z-50 right-[5%] top-[5%] shadow-[0_0_20px_10px_rgba(236,216,246,0.1)]">
          <MouseSVG />
          <p className="text-grey-normal text-xs">Use Mouse to move around</p>
        </div>
      )}
      <Canvas
        className={`${!isVRM && "rounded-[10%] shadow-[0_0_20px_10px_rgba(236,216,246,0.1)] border border-white-3"}`}
        onClick={() => setFirstClick(true)}
      >
        <ambientLight intensity={0.1} />
        <directionalLight />
        <Environment preset="city" />
        <Viewer3d
          updateCameraAndControls={updateCameraAndControls}
          url={itemURL}
          animationUrl={animationURL}
          floorEnabled={false}
          isVRM={isVRM}
          onLoad={() => setLoaded(true)}
        />
        <OrbitControls
          ref={orbitRef}
          enableZoom={false}
          minPolarAngle={Math.PI / 2 - 0.5} // Lock vertical movement
          maxPolarAngle={Math.PI / 2 + 0.5} // Lock vertical movement
        />
      </Canvas>
    </>
  );
}

export default AssetPage3dViewer;
