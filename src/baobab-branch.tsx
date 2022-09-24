import React from "react";
import { Cone, Cylinder, Sphere } from "@react-three/drei";
import { Vector3, Euler, Quaternion, Color } from "three";
import { forEachUntil } from "./helpers/list.helpers";
import { BranchType } from "./baobab";

type Props = {
  scale: number;
  position: Vector3;
  rotation: Euler;
  depth: number;
  currentDepth?: number;
  branching: number;
  angle: number;
  noise: number;
  branchType: BranchType;
  branchHeight: number;
};

const BaobabBranch = (props: Props) => {
  const {
    scale,
    position,
    rotation,
    depth,
    currentDepth = depth,
    branching,
    angle,
    noise,
    branchType,
    branchHeight,
  } = props;
  const color = new Color((currentDepth / depth) * 0.6, 0.2, 0);
  return (
    <>
      {branchType === "cone" ? (
        <Cone
          position={position}
          rotation={rotation}
          scale={[0.2 * scale, 1.5 * scale, 0.2 * scale]}
        >
          <meshStandardMaterial color={color} />
        </Cone>
      ) : (
        <>
          <Cylinder
            position={position}
            rotation={rotation}
            scale={[0.2 * scale, 1.5 * scale, 0.2 * scale]}
          >
            <meshStandardMaterial color={color} />
          </Cylinder>
          <Sphere
            position={position
              .clone()
              .add(new Vector3(0, 0.75 * scale, 0).applyEuler(rotation))}
            scale={[0.2 * scale, 0.2 * scale, 0.2 * scale]}
          >
            <meshStandardMaterial color={color} />
          </Sphere>
        </>
      )}
      {currentDepth > 0 ? (
        forEachUntil(branching, (index) => {
          const branchAngle = (2 * Math.PI * index) / branching;
          const axisY = new Vector3(0, 1, 0);
          return (
            <BaobabBranch
              {...props}
              key={`branch-${currentDepth}-${index}`}
              position={position
                .clone()
                .add(
                  new Vector3(0, branchHeight * scale, 0.2 * scale)
                    .applyAxisAngle(axisY, branchAngle)
                    .applyEuler(rotation)
                )}
              rotation={new Euler().setFromQuaternion(
                new Quaternion()
                  .setFromEuler(rotation)
                  .multiply(
                    new Quaternion().setFromAxisAngle(
                      new Vector3(1, 0, 0).applyAxisAngle(axisY, branchAngle),
                      noise ? angle + noise * Math.random() : angle
                    )
                  )
              )}
              scale={scale * 0.6}
              currentDepth={currentDepth - 1}
            />
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default BaobabBranch;
