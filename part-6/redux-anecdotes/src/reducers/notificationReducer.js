import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
  }
})

export const { createNotification } = notificationSlice.actions

export const setNotification = (msg, delay) => {
  return async dispatch => {
    dispatch(createNotification(msg))
    setTimeout(() => {
      dispatch(createNotification(null))
    }, delay);
  }
}
export default notificationSlice.reducer