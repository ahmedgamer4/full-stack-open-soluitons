import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import anecsReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    anecs: anecsReducer,
    filter: filterReducer,
  },
});

console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () =>
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );

renderApp();
store.subscribe(renderApp);
