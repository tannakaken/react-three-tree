import React from "react";
import { Euler, Vector3 } from "three";
import BaobabBranch from "./baobab-branch";

export type BranchType = "cylinder" | "cone";

type Props = {
  depth: number;
  branching: number;
  angle: number;
  noise: number;
  branchType: BranchType;
  branchHeight: number;
};

const Baobab = ({ angle, branchHeight, ...props }: Props) => {
  const position = new Vector3(0, 0, 0);
  const rotation = new Euler(0, 0, 0);
  const scale = 1;
  return (
    <BaobabBranch
      position={position}
      rotation={rotation}
      scale={scale}
      angle={(angle / 180) * Math.PI}
      branchHeight={2 * branchHeight - 1} // 枝の中心が原点なので調節
      {...props}
    />
  );
};

export default Baobab;
