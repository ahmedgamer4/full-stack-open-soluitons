import { createSlice } from "@reduxjs/toolkit";
import anecService from "../services/anecs";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnec(state, action) {
      state.push(action.payload)
    },
    setAnecs(state, action) {
      return action.payload
    },
    changeAnec(state, action) {
      const id = action.payload.id
      const updatedAnec = action.payload
      console.log(updatedAnec)
      return state.map((a) => a.id === id ? updatedAnec : a)  // You should return the value because this not mutation
    }
  }
})

export const { appendAnec, setAnecs, changeAnec } = anecSlice.actions

export const initalizeAnecs = () => {
  return async dispatch => {
    const anecs = await anecService.getAll()
    console.log(anecs)
    dispatch(setAnecs(anecs))
  }
}

export const createAnec = (content) => {
  return async dispatch => {
    const newAnec = await anecService.createNew(content)
    dispatch(appendAnec(newAnec))
  }
}

export const voteOf = (anec) => {
  return async dispatch => {
    const anecToUpdate = { ...anec, votes: anec.votes + 1}
    console.log(anecToUpdate)
    const updatedAnec = await anecService.update(anecToUpdate)
    console.log(updatedAnec)
    dispatch(changeAnec(updatedAnec))
  }
}

export default anecSlice.reducer;
