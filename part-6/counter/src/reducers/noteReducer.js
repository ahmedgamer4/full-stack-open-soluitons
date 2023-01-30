const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.data];

    case "TOGGLE_IMPORTANCE":
      const id = action.data.id;
      const noteToChange = state.find((n) => n.id === id);
      const updatedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((n) => (id === n.id ? updatedNote : n));

    default:
      return state;
  }
};

export default noteReducer;