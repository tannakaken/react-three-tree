import React, { Suspense, useCallback, useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import "./App.css";
import Tree from "./tree";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
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
    video: false,
  });
  const toggleCamera = useCallback(async () => {
    if (videoRef.current === null) {
      return;
    }
    if (parameters.video) {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720,
        },
        audio: false,
      });
      videoRef.current.srcObject = mediaStream;
      await videoRef.current.play();
    } else {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      videoRef.current.load();
    }
  }, [parameters.video]);

  useEffect(() => {
    toggleCamera();
  }, [toggleCamera]);
  return (
    <div className="App">
      <Suspense fallback={<p>loading...</p>}>
        <Canvas>
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Tree {...parameters} />
        </Canvas>
      </Suspense>
      <video
        style={{
          background: "white",
          position: "absolute",
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          top: 0,
          left: 0,
        }}
        ref={videoRef}
      />
    </div>
  );
}

export default App;
