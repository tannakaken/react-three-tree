import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { button, Leva, useControls } from "leva";
import ReactModal from "react-modal";
import Baobab, { BranchType } from "./baobab";

function BaobabMaker() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
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
    about: {
      ...button(() => setIsInfoOpen(true)),
      label: "このサイトについて",
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
      const mediaStream = videoRef.current.srcObject as MediaStream;
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
      videoRef.current.load();
    }
  }, [videoOn]);

  useEffect(() => {
    toggleCamera();
  }, [toggleCamera]);
  return (
    <>
      <Suspense fallback={<p>loading...</p>}>
        <Canvas>
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Baobab {...parameters} />
        </Canvas>
      </Suspense>
      <video className="video" ref={videoRef} playsInline />
      <button className="video-button" onClick={() => setVideoOn(!videoOn)}>
        {videoOn ? "カメラ停止" : "カメラ起動"}
      </button>
      <ReactModal
        isOpen={isInfoOpen}
        onRequestClose={() => setIsInfoOpen(false)}
        contentLabel="Info Modal"
        style={{
          content: {
            borderRadius: "20px",
          },
        }}
      >
        <div className="info">
          <h2>バオバブメーカー</h2>
          <p>
            このサイトは<strong>再帰的構造</strong>による
            <strong>フラクタル</strong>を使って様々な
            <strong>バオバブ</strong>
            を作成し、現実世界に置くことができるサイトです。
          </p>
          <p>現実に存在しないバオバブを作ってみましょう。</p>
          <p>ちなみにバオバブジュースはねっとり甘くて美味しいですよ。</p>
          <p>
            製作者:
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://tannakaken.xyz/"
            >
              淡中圏
            </a>
            （twitter:
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/tannakaken"
            >
              @tannakaken
            </a>
            ）
          </p>
          <figure>
            <img
              alt="マグリットを改変した自画像"
              src="Abstract_Idea.jpg"
              className="abstract-idea"
            />
            <figcaption>
              上記の自画像はパブリックドメインになったマグリットの絵『Abstract
              Idea』を改変したものです。
            </figcaption>
          </figure>
          <button onClick={() => setIsInfoOpen(false)}>閉じる</button>
        </div>
      </ReactModal>
      <Leva hidden={isInfoOpen} />
    </>
  );
}

export default BaobabMaker;
