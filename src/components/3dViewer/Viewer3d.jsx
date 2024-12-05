/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import {
  AnimationClip,
  AnimationMixer,
  LoopPingPong,
  Quaternion,
  QuaternionKeyframeTrack,
  Vector3,
  VectorKeyframeTrack,
  Box3,
  Mesh,
  MeshBasicMaterial,
  Shape,
  ShapeGeometry,
  EllipseCurve,
  DoubleSide,
} from "three";
import { mixamoVRMRigMap } from "@/constants/mixamoMap";
import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import useScreenWidth from "@/hooks/useScreenSize";
import Spinner from "../Spinner";
import { Html } from "@react-three/drei";

function Viewer3d({
  updateCameraAndControls,
  url,
  animationUrl,
  floorEnabled = true,
  isVRM = true,
  onLoad = () => {},
}) {
  const [mixer, setMixer] = useState(null);
  const { scene } = useThree();
  const [asset, setAsset] = useState(null);
  const [floor, setFloor] = useState(null); // State for the floor mesh
  const [loadingAnimation, setLoadingAnimation] = useState(true); // Loading state
  const [loading, setLoading] = useState(true); // Loading Animation state

  const screenWidth = useScreenWidth();

  const loadFbxAnimation = useCallback(
    (object) => {
      if (!object.humanoid) return; // check if its a VRM
      setLoadingAnimation(true);
      mixer.stopAllAction();

      const loader = new FBXLoader(); // A loader which loads FBX
      loader.loadAsync(animationUrl).then((fbx) => {
        const clip = fbx.animations[0]; // extract the AnimationClip

        const tracks = []; // KeyframeTracks compatible with VRM will be added here

        const restRotationInverse = new Quaternion();
        const parentRestWorldRotation = new Quaternion();
        const _quatA = new Quaternion();
        const _vec3 = new Vector3();

        // Adjust with reference to hips height.
        const motionHipsHeight =
          fbx.getObjectByName("mixamorigHips").position.y;
        const vrmHipsY = object.humanoid
          ?.getRawBoneNode("hips")
          .getWorldPosition(_vec3).y;
        const vrmRootY = object.scene.getWorldPosition(_vec3).y;
        const vrmHipsHeight = Math.abs(vrmHipsY - vrmRootY);
        const hipsPositionScale = vrmHipsHeight / motionHipsHeight;

        clip.tracks.forEach((track) => {
          // Convert each tracks for VRM use, and push to `tracks`

          const trackSplitted = track.name.split(".");
          const mixamoRigName = trackSplitted[0];
          const vrmBoneName = mixamoVRMRigMap[mixamoRigName];
          const vrmNodeName =
            object.humanoid?.getRawBoneNode(vrmBoneName)?.name;

          const mixamoRigNode = fbx.getObjectByName(mixamoRigName);

          if (vrmNodeName != null) {
            const propertyName = trackSplitted[1];

            // Store rotations of rest-pose.
            mixamoRigNode.getWorldQuaternion(restRotationInverse).invert();
            mixamoRigNode.parent.getWorldQuaternion(parentRestWorldRotation);

            if (track instanceof QuaternionKeyframeTrack) {
              // Retarget rotation of mixamoRig to NormalizedBone.
              for (let i = 0; i < track.values.length; i += 4) {
                const flatQuaternion = track.values.slice(i, i + 4);

                _quatA.fromArray(flatQuaternion);

                _quatA
                  .premultiply(parentRestWorldRotation)
                  .multiply(restRotationInverse);

                _quatA.toArray(flatQuaternion);

                flatQuaternion.forEach((v, index) => {
                  track.values[index + i] = v;
                });
              }

              tracks.push(
                new QuaternionKeyframeTrack(
                  `${vrmNodeName}.${propertyName}`,
                  track.times,
                  track.values.map((v, i) =>
                    object.meta?.metaVersion === "0" && i % 2 === 0 ? -v : v
                  )
                )
              );
            } else if (track instanceof VectorKeyframeTrack) {
              const value = track.values.map(
                (v, i) =>
                  (object.meta?.metaVersion === "0" && i % 3 !== 1 ? -v : v) *
                  hipsPositionScale
              );
              tracks.push(
                new VectorKeyframeTrack(
                  `${vrmNodeName}.${propertyName}`,
                  track.times,
                  value
                )
              );
            }
          }
        });

        const animationClip = new AnimationClip(
          "vrmAnimation",
          fbx.animations[0].duration,
          tracks
        );

        const action = mixer.clipAction(animationClip);
        action.setLoop(LoopPingPong);
        action.play();
        setLoadingAnimation(false);
      });
    },
    [animationUrl, mixer, asset]
  );

  function loadAsset(url) {
    const loader = new GLTFLoader();
    setLoading(true);

    if (isVRM) {
      loader.register(
        (parser) => new VRMLoaderPlugin(parser, { autoUpdateHumanBones: true })
      );

      return loader
        .loadAsync(url)
        .then((gltf) => {
          const vrm = gltf.userData.vrm;

          VRMUtils.rotateVRM0(vrm);
          setLoading(false);
          return vrm;
        })
        .catch((error) => {
          setLoading(false);
          onLoad();
          throw new Error(error);
        });
    } else {
      return loader
        .loadAsync(url)
        .then((gltf) => {
          setLoading(false);
          onLoad();
          return gltf;
        })
        .catch((error) => {
          setLoading(false);
          onLoad();
          throw new Error(error);
        });
    }
  }

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  useEffect(() => {
    const cleanup = () => {
      if (asset) {
        scene.remove(asset.scene); // Remove the model from the scene
      }
      if (mixer) {
        mixer.stopAllAction();
        setMixer(null); // Set mixer to null to clean up reference
      }
      if (floor) {
        scene.remove(floor); // Remove the floor from the scene
        setFloor(null); // Clean up floor reference
      }
    };

    loadAsset(url).then(async (asset) => {
      cleanup(); // Cleanup before adding a new model to the scene

      setAsset(asset);
      scene.add(asset.scene);

      if (isVRM) {
        const mixer = new AnimationMixer(asset.scene);
        setMixer(mixer);
      }

      const boundingBox = new Box3().setFromObject(asset.scene);
      const size = boundingBox.getSize(new Vector3());
      const center = boundingBox.getCenter(new Vector3());

      // Calculate the bottom position
      const bottom = new Vector3(center.x, boundingBox.min.y, center.z);

      // Set the asset position so that it is at the bottom
      asset.scene.position.set(0, -bottom.y, 0);

      updateCameraAndControls(center, size.length());

      // Create and add the floor
      if (floorEnabled) {
        // Create an ellipse shape
        const curve = new EllipseCurve(
          0,
          0, // ax, aY
          0.75,
          1, // xRadius, yRadius
          0,
          2 * Math.PI, // aStartAngle, aEndAngle
          false, // aClockwise
          -1.5 // aRotation
        );

        const points = curve.getPoints(50);
        const shape = new Shape(points);
        const floorGeometry = new ShapeGeometry(shape);
        const floorMaterial = new MeshBasicMaterial({
          color: 0x287ecc, // Blue color
          side: DoubleSide, // Ensure the floor is visible from both sides
          opacity: 0.7,
          transparent: true,
        });

        if (screenWidth > 1436) {
          const floorMesh = new Mesh(floorGeometry, floorMaterial);
          floorMesh.rotation.x = -Math.PI / 2; // Rotate to be horizontal
          floorMesh.position.set(center.x, boundingBox.min.y, center.z);
          scene.add(floorMesh);
          setFloor(floorMesh);
        }
      }
    });

    // Return the cleanup function to run on component unmount or before re-running the effect
    return cleanup;
  }, [scene, url]);

  useEffect(() => {
    if (animationUrl && mixer) {
      loadFbxAnimation(asset);
    }
  }, [animationUrl, loadFbxAnimation]);

  useEffect(() => {
    if (isVRM && loadingAnimation) {
      scene.visible = false;
    }
    if (isVRM && !loadingAnimation) {
      scene.visible = true;
    }
  }, [loadingAnimation]);

  return (
    <>
      {loading && (
        <Html zIndexRange={-1}>
          <Spinner />
        </Html>
      )}
    </>
  );
}

export default Viewer3d;
