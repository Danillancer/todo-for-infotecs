import React from 'react';
import { useEffect, useState } from 'react';

import './Todo.css';

const Todo = ({
  currentId,
  todoList,
  setTodoInputValue,
  inputTodoValue,
  addTodo,
  removeTodo,
  editTogle,
  editTodo,
  toggleTodo,
  handlerComplete
}) => {

 //создание стейта для хранения/измениня выбраного todoList
  const [currentTodo, setCurrentTodo] = useState('');
//при изменении стейта в currentId который приходит с пропсов, вызывается useEffect который изменяет стейт currentTodo, заменяя его новым currentId
  useEffect(() => {
    setCurrentTodo(...todoList.filter((i) => i.id === currentId));
  }, [currentId]);

  //Функция для отслеживания нажатой кнопки во время редактирования todo, если нажатая кнопка Enter или Escape то сработает фунция editTogle в которую нужно передать id конкретного todo
  const hendlerKeyDown = (event, id, currentTodo) => {
    if (event.key === 'Enter') {
      editTogle(id, currentTodo);
    }
    if (event.key === 'Escape') {
      editTogle(id, currentTodo);
    }
  };

  return (
    <div className="main__todo todo">
      {currentTodo ? (
        <>
          <h2 className="todo__title">{currentTodo.title}</h2>
          <input
            autoFocus
            type="text"
            value={inputTodoValue}
            onChange={(e) => setTodoInputValue(e.target.value)}
            onKeyPress={(e) => addTodo(e, currentTodo.id)}
            className="todo__input"
            placeholder="Add Todo"
          />
          {currentTodo ? (
            currentTodo.todo.map((el) => (
              <div key={el.id} className="todo__item">
                {el.edit !== false ? (
                  <input
                    autoFocus
                    type="text"
                    value={el.title}
                    className="todo__text"
                    onChange={(e) => {
                      editTodo(el.id, e.target.value, currentTodo.id);
                    }}
                    onKeyDown={(event) =>
                      hendlerKeyDown(event, el.id, currentTodo.id)
                    }
                  />
                ) : (
                  <label onClick={() =>{
                  toggleTodo(el.id, currentTodo.id)
                  handlerComplete(currentTodo.id)
                  }
                  } className="label-checkbox">
                    <input type="checkbox" checked={el.completed} readOnly className="checkbox"/>
                    <div
                      onClick={() => {
                        toggleTodo(el.id, currentTodo.id)
                        handlerComplete(currentTodo.id)
                        }}
                      className={`todo__text ${el.completed ? 'completed' :''}`}
                    >
                      {el.title}
                    </div>
                  </label>
                )}
                <div className="todo__btn">
                  <i onClick={() => {
                      editTogle(el.id, currentTodo.id);
                    }} className="fa-solid fa-pen"></i>
                  <i onClick={() => {
                      removeTodo(el.id, currentTodo.id);
                    }} className="fa-solid fa-trash"></i>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Todo;
