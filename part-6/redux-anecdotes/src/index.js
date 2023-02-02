import React from "react";
import ReactDOM from "react-dom/client";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import anecsReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({
  anecs: anecsReducer,
  filter: filterReducer,
})

const store = createStore(reducer);
console.log(store)

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () =>
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );

renderApp();
store.subscribe(renderApp);
