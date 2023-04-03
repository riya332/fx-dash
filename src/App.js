import React from "react";
import "./App.css";
import CardContainer from "./components/CardContainer/CardContainer";
import ControlBar from "./components/ControlBar/ControlBar";
import SortToolBar from "./components/SortToolBar/SortToolBar";


function App() {

  return (
    <div className="App">
      <ControlBar />
      <SortToolBar />
      <CardContainer />
    </div>
  );
}

export default App;
