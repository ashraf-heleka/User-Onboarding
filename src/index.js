import React from "react";
import ReactDOM from "react-dom";
import OnboardForm from "./components/Form";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <OnboardForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
