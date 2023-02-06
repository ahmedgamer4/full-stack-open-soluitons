import { useDispatch, useSelector } from "react-redux";
import { voteOf } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const Anec = ({ anecdote }) => {
  const dispatch = useDispatch();

  const vote = () => {
    dispatch(voteOf(anecdote));
    dispatch(createNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(createNotification(null))
    }, 5000);
  };

  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote()}>vote</button>
      </div>
    </div>
  );
};

const Anecs = () => {
  const anecdotes = useSelector(({ anecs, filter }) =>
    anecs
      .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => (a.votes > b.votes ? -1 : 1))
  );


  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anec
          key={anecdote.id}
          anecdote={anecdote}
        />
      ))}
    </div>
  );
};

export default Anecs;
