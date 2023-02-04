import Anecs from "./components/Anecs"
import NewAnec from "./components/NewAnec"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
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