import React from "react";
import { Cylinder, Sphere } from "@react-three/drei";
import { Vector3, Euler, Quaternion, Color } from "three";
import { forEachUntil } from "./helpers/list.helpers";

type Props = {
  scale: number;
  position: Vector3;
  rotation: Euler;
  depth: number;
  currentDepth?: number;
  branching: number;
  angle: number;
  noise?: number;
};

const Branch = ({
  scale,
  position,
  rotation,
  depth,
  currentDepth = depth,
  branching,
  angle,
  noise = 0,
}: Props) => {
  const color = new Color((currentDepth / depth) * 0.6, 0.2, 0);
  return (
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
      {currentDepth > 0 ? (
        forEachUntil(branching, (index) => {
          const branchAngle = (2 * Math.PI * index) / branching;
          const axisY = new Vector3(0, 1, 0);
          return (
            <Branch
              position={position
                .clone()
                .add(
                  new Vector3(0, scale, 0.2 * scale)
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
              depth={depth}
              currentDepth={currentDepth - 1}
              branching={branching}
              angle={angle}
            />
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default Branch;
