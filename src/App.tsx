import TodoList from './Components/Todolist'
import Navbar from './Components/Navbar'
import Timer from './Components/Timer'
const App: React.FC = () => {
  return <div>
    <Navbar />
    <Timer/>
    <TodoList />
  </div>
}

export default App