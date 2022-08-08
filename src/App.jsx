import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Todo from './components/Todo/Todo';

import TodoList from './components/TodoList/TodoList';

function App() {
  //создание стейта для хранения/измениня todo
  const [todoList, setTodoList] = useState([]);
  //Создание стейта для хранения/изменения value инпута, значение которого нужно для создания todolist
  const [inputListValue, setListInputValue] = useState('');
  //Создание стейта для хранения/изменения value инпута, значение которого нужно для создания todo
  const [inputTodoValue, setTodoInputValue] = useState('');
  //создание стейта для хранения/измениня id выбраного списка
  const [currentId, setCurrentId] = useState('');
 //создание стейта для хранения/измениня value инпута, значение которого нужно для сортировки todolist
  const [sotrInputValue, setSortInputValue] = useState('');

  //функция переключения у todo поля completed, для ее работы нужно передать currentId конкретного todolist, и id конкретной todo
  const toggleTodo = (id, currentId) => {
    setTodoList(
      todoList.map((el) => {
        if (el.id === currentId) {
          el.todo.map(el=>{
            if (el.id === id) {
              el.completed = !el.completed;
            }
          }) 
        }
        return el;
      })
    );
  };

  //функция удаления todolist, для ее работы нужно передать id конкретного todo
  const removeTask = (id) => {
    if (id === currentId) {
      setCurrentId('')
    }
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };
//функция удаления todo, для ее работы нужно передать currentId конкретного todolist, и id конкретной todo
  const removeTodo = (id,currentId) => {
    setTodoList(
      
      todoList.map(el=>{
        if(el.id === currentId){
          el.todo=el.todo.filter(i=> i.id !== id);
        }
        return el
      }),
    )
  };

  //функция добавления todoList, для ее вызова нужно нажать на кнопку Enter при фокусе на инпуте, она использует inputListValue, на основе которого генирирует новое todoList
  const addTodoList = (e) => {
    if (e.key === 'Enter' && inputListValue.trim() !== '') {
      setTodoList([
        ...todoList,
        {
          id: Date.now(),
          title: inputListValue,
          completed: 'waiting', //completed,in-process
          todo: [],
        },
      ]);
      setListInputValue('');
    }
  };
 //функция добавления todo, для ее вызова нужно нажать на кнопку Enter при фокусе на инпуте, она использует inputTodoValue, на основе которого генирирует новое todo
  const addTodo = (e, id) => {
    if (e.key === 'Enter' && inputTodoValue.trim() !== '') {
      setTodoList(
        todoList.map((i) => {
          if (i.id === id) {
            i.todo = [
              ...i.todo,
              {
              id: Date.now(),
              title: inputTodoValue,
              completed: false,
              edit: false,
            }]
          }
          return i
        })
      )
      setTodoInputValue('');
    }
  };

  //функция редактирования todo, для ее работы нужно передать id конкретного todo, title(значение инпута) и currentId(id конкретного todolist)
  const editTodo = (id, title,currentId) => {
    setTodoList(
      todoList.map((el) => {
        if (el.id === currentId) {
          el.todo.map(el=>{
            if(el.id === id){
              el.title = title;
            }
          })
        }
        return el;
      })
    );
  };

  //функция изменения статуса редактирования todo, для ее работы нужно передать id конкретного todo и currentId(id конкретного todolist)
  const editTogle = (id,currentId) => {
    setTodoList(
      todoList.map((el) => {
        if (el.id === currentId) {
          el.todo.map(el=>{
            if(el.id === id){
              el.edit = !el.edit;
            }
          })
        }
        return el;
      })
    );
  };
//функция изменения статуса поля completed у todolist, для  ее работы нужно нужно передать currentId(id конкретного todolist), она проверяет у todolist сколько todo имеет статус completed=true, и присваивает один из статусов completed/waiting/in-process
const handlerComplete = (currentId)=>{
  setTodoList(
    todoList.map(el=>{
      if (el.id === currentId){
        if (el.todo.every(el=> el.completed === true)){
         el.completed = 'completed'
        }else
        if (el.todo.every(el=> el.completed === false)){
        el.completed = 'waiting'
        }else
        if(el.todo.some(el=> el.completed === true)){
         el.completed = 'in-process'
        }
      }
     return el
    })
  )
}



  return (
    <>
      <Header sotrInputValue={sotrInputValue} setSortInputValue={setSortInputValue}/>
      <main className="main">
        <div className="main__container container">
          
          <div className="main__row">
            <TodoList
              todoList={todoList}
              removeTask={removeTask}
              setListInputValue={setListInputValue}
              addTodoList={addTodoList}
              inputListValue={inputListValue}
              setCurrentId={setCurrentId}
              sotrInputValue={sotrInputValue}
            />
            <Todo
              currentId={currentId}
              todoList={todoList}
              inputTodoValue={inputTodoValue}
              setTodoInputValue={setTodoInputValue}
              addTodo={addTodo}
              removeTodo={removeTodo}
              editTogle={editTogle}
              editTodo={editTodo}
              toggleTodo={toggleTodo}
              handlerComplete={
                handlerComplete
              }
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
