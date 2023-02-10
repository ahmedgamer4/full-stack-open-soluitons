import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./reducers/noteReducer";
import fitlerReducer from "./reducers/filterReducer";

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: fitlerReducer,
  },
});

export default store