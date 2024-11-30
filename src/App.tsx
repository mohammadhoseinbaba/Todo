import TodoList from './Components/Todolist'
import Navbar from './Components/Navbar'
import Timer from './Components/Timer'
import Todo from './Components/Todo'
import Calender from './Components/Calender'
const App: React.FC = () => {
  return <div>
    <Calender/>
    <TodoList />
  </div>
}

export default App