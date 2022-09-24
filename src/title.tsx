import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Baobab from "./baobab";

function Title() {
  return (
    <>
      <h1 className="title">バオバブメーカー</h1>
      <Suspense fallback={<p>loading...</p>}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Baobab
            depth={4}
            branching={5}
            angle={60}
            noise={0.1}
            branchType={"cylinder"}
            branchHeight={1}
          />
        </Canvas>
      </Suspense>
    </>
  );
}

export default Title;
