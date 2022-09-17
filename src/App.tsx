import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import "./App.css";

import { ARButton, XR } from "@react-three/xr";
import Tree from "./tree";

function App() {
  const parameters = useControls({
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

  return (
    <div className="App">
      <Suspense fallback={<p>loading...</p>}>
        <ARButton />
        <Canvas>
          <XR
            onSessionStart={() => {
              alert("ar start");
            }}
          >
            <OrbitControls />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Tree {...parameters} />
          </XR>
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
