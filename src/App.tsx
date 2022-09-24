import React, { Suspense, useCallback, useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import "./App.css";
import Tree from "./tree";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
  const drawCanvas = useCallback(() => {
    if (videoRef.current === null) {
      return;
    }
    if (canvasRef.current === null) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d");
    if (ctx === null) {
      return;
    }
    ctx.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    requestAnimationFrame(drawCanvas);
  }, []);
  const toggleCamera = useCallback(async () => {
    if (videoRef.current === null) {
      return;
    }
    if (canvasRef.current === null) {
      return;
    }
    if (parameters.video) {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720,
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });
      videoRef.current.srcObject = mediaStream;
      await videoRef.current.play();
      requestAnimationFrame(drawCanvas);
    } else {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      videoRef.current.load();
      const ctx = canvasRef.current.getContext("2d");
      if (ctx === null) {
        return;
      }
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [parameters.video, drawCanvas]);

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
      <canvas
        style={{
          background: "white",
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
          top: 0,
          left: 0,
          objectFit: "cover",
        }}
        ref={canvasRef}
      />
      <video
        style={{
          display: "hidden",
        }}
        ref={videoRef}
      />
    </div>
  );
}

export default App;
