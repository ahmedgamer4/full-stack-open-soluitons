import { useDispatch, useSelector } from "react-redux";
import { voteOf } from "../reducers/anecdoteReducer";

const Anec = ({ anecdote, vote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

const Anecs = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => (a.votes > b.votes ? -1 : 1))
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteOf(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anec
          vote={() => vote(anecdote.id)}
          key={anecdote.id}
          anecdote={anecdote}
        />
      ))}
    </div>
  );
};

export default Anecs;
