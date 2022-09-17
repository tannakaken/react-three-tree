import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Euler, Quaternion, Vector3 } from "three";
import { useControls } from "leva";
import "./App.css";
import Branch from "./branch";
import { ARButton, useHitTest, XR } from "@react-three/xr";

function App() {
  const { depth, branching, angle, noise } = useControls({
    depth: {
      value: 3,
      min: 1,
      max: 5,
      step: 1,
    },
    branching: {
      value: 3,
      min: 1,
      max: 6,
      step: 1,
    },
    angle: {
      value: 45,
      min: 0,
      max: 360,
      step: 1,
    },
    noise: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.1,
    },
  });
  const position = new Vector3(0, 0, 0);
  const rotation = new Euler(0, 0, 0);
  const scale = 1;

  useHitTest((hitMatrix, _) => {
    hitMatrix.decompose(
      position,
      new Quaternion().setFromEuler(rotation),
      new Vector3(scale, scale, scale)
    );
  });

  return (
    <div className="App">
      <Suspense fallback={<p>loading...</p>}>
        <ARButton />
        <Canvas>
          <XR>
            <OrbitControls />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Branch
              position={position}
              rotation={rotation}
              scale={scale}
              depth={depth}
              branching={branching}
              angle={(angle / 180) * Math.PI}
              noise={noise}
            />
          </XR>
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
