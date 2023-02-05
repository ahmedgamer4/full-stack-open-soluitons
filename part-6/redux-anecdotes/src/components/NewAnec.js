import { useDispatch } from "react-redux";
import { createAnec } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const NewAnec = () => {
  const dispatch = useDispatch();

  const addAnec = async (event) => {
    event.preventDefault();
    const content = event.target.anec.value;
    event.target.anec.value = "";
    dispatch(createAnec(content));
    dispatch(`a new message '${createNotification(content)}'`)
    setTimeout(() => {
      dispatch(createNotification(''))
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div>
          <input name="anec" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default NewAnec;
