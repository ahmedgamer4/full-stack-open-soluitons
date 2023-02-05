import Anecs from "./components/Anecs"
import NewAnec from "./components/NewAnec"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { initalizeAnecs } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initalizeAnecs())
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