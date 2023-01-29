import React from "react";
import { ReactDOM } from "react";
import { createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);

const App = () => {
  return (
    <div>
      <button onClick={() => store.dispatch("GOOD")}>good</button>
      <button onClick={() => store.dispatch("OK")}>ok</button>
      <button onClick={() => store.dispatch("BAD")}>bad</button>
      <button onClick={() => store.dispatch("ZERO")}>zero</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => root.render(<App />);

renderApp();
store.subscribe(renderApp);
