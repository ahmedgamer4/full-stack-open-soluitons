import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { filterChange } from "./reducers/filterReducer";
import { createNote } from "./reducers/noteReducer";
import { Provider } from "react-redux";
import store from './store' 


console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () =>
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );


store.subscribe(() => console.log(store.getState()));
store.dispatch(filterChange("IMPORTANT"));
store.dispatch(
  createNote("combineReducers forms one reducer from many simple reducers")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
renderApp();
store.subscribe(renderApp);
