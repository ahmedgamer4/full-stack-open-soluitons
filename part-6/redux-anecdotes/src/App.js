import Anecs from "./components/Anecs"
import NewAnec from "./components/NewAnec"
import Filter from "./components/Filter"

const App = () => {
  return (
    <div>
      <Filter />
      <Anecs />
      <NewAnec />
    </div>
  )
}

export default App