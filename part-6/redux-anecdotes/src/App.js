import Anecs from "./components/Anecs"
import NewAnec from "./components/NewAnec"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import anecService from "./services/anecs"
import { setNotes } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecService.getAll().then((notes) => dispatch(setNotes(notes)))
  }, [dispatch])
  return (
    <div>
      <Notification />
      <Filter />
      <Anecs />
      <NewAnec />
    </div>
  )
}

export default App