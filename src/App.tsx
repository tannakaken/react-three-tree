import React, { useEffect, useState } from "react";
import "./App.css";

import BaobabMaker from "./baobab-maker";
import Title from "./title";

function App() {
  const [showTitle, setShowTitle] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowTitle(false);
    }, 3000);
  }, []);
  return <div className="App">{showTitle ? <Title /> : <BaobabMaker />}</div>;
}

export default App;
