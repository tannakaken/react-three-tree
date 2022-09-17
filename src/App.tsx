import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Euler, Vector3 } from "three";
import "./App.css";
import Branch from "./branch";

function App() {
  return (
    <div className="App">
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Branch
          position={new Vector3(0, 0, 0)}
          rotation={new Euler(0, 0, 0)}
          scale={1}
          depth={4}
          branching={6}
          angle={Math.PI / 4}
          noise={0}
        />
      </Canvas>
    </div>
  );
}

export default App;
