import React, { useEffect, useState } from "react";
import "./App.css";

import BaobabMaker from "./baobab-maker";

function App() {
  const [showTitle, setShowTitle] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowTitle(false);
    }, 2000);
  }, []);
  return (
    <div className="App">
      {showTitle ? (
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "Large",
          }}
        >
          バオバブメーカー
        </h1>
      ) : (
        <BaobabMaker />
      )}
    </div>
  );
}

export default App;
