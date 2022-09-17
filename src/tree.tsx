import { useHitTest } from "@react-three/xr";
import React from "react";
import { Euler, Quaternion, Vector3 } from "three";
import Branch from "./branch";

type Props = {
  depth: number;
  branching: number;
  angle: number;
  noise?: number;
};

const Tree = ({ depth, branching, angle, noise = 0 }: Props) => {
  const position = new Vector3(0, 0, 0);
  const rotation = new Euler(0, 0, 0);
  const scale = 1;

  useHitTest((hitMatrix, _) => {
    position.applyMatrix4(hitMatrix);
  });
  return (
    <Branch
      position={position}
      rotation={rotation}
      scale={scale}
      depth={depth}
      branching={branching}
      angle={(angle / 180) * Math.PI}
      noise={noise}
    />
  );
};

export default Tree;
