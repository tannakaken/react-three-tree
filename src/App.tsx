import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import "./App.css";
import Tree, { BranchType } from "./tree";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const parameters = useControls({
    depth: {
      value: 3,
      min: 1,
      max: 5,
      step: 1,
      label: "枝分かれの深さ",
    },
    branching: {
      value: 3,
      min: 1,
      max: 6,
      step: 1,
      label: "枝分かれの数",
    },
    angle: {
      value: 45,
      min: 0,
      max: 180,
      step: 1,
      label: "枝の角度",
    },
    noise: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.1,
      label: "ノイズ",
    },
    branchType: {
      options: ["cylinder", "cone"] as BranchType[],
      label: "枝の種類",
    },
    branchHeight: {
      value: 1,
      min: 0.5,
      max: 1,
      step: 0.1,
      label: "枝の生える高さ",
    },
  });
  const [videoOn, setVideoOn] = useState(false);
  const toggleCamera = useCallback(async () => {
    if (videoRef.current === null) {
      return;
    }
    if (videoOn) {
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
    } else {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      videoRef.current.load();
    }
  }, [videoOn]);

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
          width: "100%",
          height: "100%",
          zIndex: -1,
          top: 0,
          left: 0,
          objectFit: "cover",
        }}
        ref={videoRef}
        playsInline
      />
      <button
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translate(-50%, 0)",
          width: "100px",
          height: "40px",
          border: "none",
          background: "lightgrey",
          color: "grey",
        }}
        onClick={() => setVideoOn(!videoOn)}
      >
        {videoOn ? "カメラ停止" : "カメラ起動"}
      </button>
    </div>
  );
}

export default App;
