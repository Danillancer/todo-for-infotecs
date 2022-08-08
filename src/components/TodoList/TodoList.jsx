import './TodoList.css';

const TodoList = ({
  todoList,
  removeTask,
  setListInputValue,
  addTodoList,
  inputListValue,
  setCurrentId,
  sotrInputValue
}) => {
  return (
    <div className="todo-list">
      <input
      autoFocus 
        type="text"
        value={inputListValue}
        onChange={(e) => setListInputValue(e.target.value)}
        onKeyPress={e=>addTodoList(e)}
        className="todo-list__input"
        placeholder="New list"
      />
      {todoList? todoList.filter(todos=>todos.title.toLowerCase().includes(sotrInputValue)).map((el) => (
        <div key={el.id} className={`todo-list__item ${el.completed==="completed"? 'completed':""}${el.completed==="in-process"? 'in-process':""}`} >
          <div onClick={() => {
            setCurrentId(el.id)
            
          }} className="todo-list__text">
            {el.title}
          </div>
            <i  onClick={() => {
            removeTask(el.id)}} className="fa-solid fa-trash"></i>
        </div>
      )):<></>
      
      }
    </div>
  );
};

export default TodoList;
