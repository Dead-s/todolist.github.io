import { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const [newItem, setnewItem] = useState("");
  var [todos, setTodos] = useState([]);
  let completed_count = 0;
  const date = new Date(Date.now());
  var _isfilter = useRef('');

  setTimeout(() => {
    filter_icon_change();
  }, 500);

  if (!localStorage.getItem('mode')) {
    localStorage.setItem('mode', 'dark');
  }
  if (!localStorage.getItem('filter')) {
    localStorage.setItem('filter', 'All');
  }
  useEffect(() => {
    if (localStorage.getItem('todo_list')) {
      // console.log('set lcl' + JSON.parse(localStorage.getItem('todo_list')).length)
      setTodos(todos = JSON.parse(localStorage.getItem('todo_list')));
    } else {
      console.log('no set')
    }
  }, []);
  function handleSubmit(e) {
    _isfilter.current = '';
    e.target.style.visibility = 'hidden';
    e.preventDefault();

    setTodos((crnt_todos) => {
      return [
        ...crnt_todos,
        { id: Math.floor(Math.random() * 999999), title: newItem, completed: false, date_time: Date.now() }
      ]
    })
    setnewItem("");
  }
  // date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  function toggleTodo(id, done) {
    _isfilter.current = '';
    setTodos(crnt_todos => {
      return crnt_todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: done }
        }
        return todo
      })
    })
  }
  function delete_todo(id) {
    setTodos(crnt_todos => { return crnt_todos.filter(todo => todo.id !== id) })
  }
  function set_filter(val) {
    _isfilter.current = 'filter';
    localStorage.setItem('filter', val);
    filter_icon_change();
    if (val == 'Completed') {
      setTodos(() => {
        todos = JSON.parse(localStorage.getItem('todo_list'));
        return todos.filter(f_todo => f_todo.completed == true)
      });
      console.log('c' + _isfilter.current);
    } if (val == 'Pending') {
      setTodos(() => {
        todos = JSON.parse(localStorage.getItem('todo_list'));
        return todos.filter(f_todo => f_todo.completed == false)
      });
    } if (val == 'All') {
      setTodos(() => {
        todos = JSON.parse(localStorage.getItem('todo_list'));
        return todos
      });
    }
  }

  return (
    <>
      <div className="parent-div">
        <div className="top-div"></div>
        <div className="bottom-div">
        </div>
        <div className="filter-div">
          <i id="filter-up" className="fa-solid fa-chevron-up"></i>
          <label onClick={(e) => { set_filter('All') }}><span>All <i className="fa-solid fa-asterisk"></i></span></label>
          <label onClick={(e) => { set_filter('Completed') }}><span>Completed <i className="fa-solid fa-circle-check"></i></span></label>
          <label onClick={(e) => { set_filter('Pending') }}><span>Pending <i className="fa-solid fa-circle-exclamation"></i></span></label>
          <div></div>
        </div>
        <div className="todo-box">
          <form className="new-item-form" >
            <div className="form-row">
              <div className="header">
                <label htmlFor="new-item-inp">Todo</label>
                <span>
                  {localStorage.getItem('mode') == 'dark' ?
                    <i id="mode-toggle" className="fa-sharp fa-solid fa-sun"></i>
                    :
                    <i id="mode-toggle" className="fa-sharp fa-solid fa-moon"></i>}
                </span>
              </div>
              <div className="inp-div">
                <input className="box" type="text" value={newItem} autoComplete="off" onChange={(e) => { setnewItem(e.target.value) }} id="new-item-inp" />
                <i id="add-todo" onClick={handleSubmit} className="fa-solid fa-paper-plane"></i>
              </div>
            </div>
          </form>
          <div className="todo-items">
            {
              (todos.length > 0 && _isfilter.current == '') && localStorage.setItem('todo_list', JSON.stringify(todos))
            }
            {
              todos.sort(function (a, b) { return b.date_time - a.date_time }).map((todoitem) => {
                if (todoitem.completed) {
                  completed_count++;
                }
                return (
                  <div key={todoitem.id} >
                    <label>
                      <input className="checkbox"
                        type="checkbox"
                        checked={todoitem.completed}
                        value={todoitem.title}
                        onChange={e => toggleTodo(todoitem.id, e.target.checked)}
                      />
                      {
                        todoitem.completed ?
                          <span className="todo-title completed">
                            {todoitem.title}
                          </span> : <span className="todo-title">
                            {todoitem.title}
                          </span>
                      }
                    </label>
                    <span ><i onClick={() => delete_todo(todoitem.id)} className="fa-solid fa-trash-can"></i></span>
                  </div>
                );
              })}
            <footer className="dark">
              <label>completed {completed_count}</label>
              <label id="filter-lbl">
                <i className="fa-solid "></i>
              </label>
              <label>clear completed</label>
            </footer>

          </div>
        </div >
      </div>

    </>
  )
}

function filter_icon_change() {
  switch (localStorage.getItem('filter')) {
    case 'All':
      document.getElementById('filter-lbl').firstChild.classList.add('fa-asterisk');
      document.getElementById('filter-lbl').firstChild.classList.remove('fa-circle-exclamation');
      document.getElementById('filter-lbl').firstChild.classList.remove('fa-circle-check');
      break;
    case 'Completed':
      document.getElementById('filter-lbl').firstChild.classList.remove('fa-asterisk');
      document.getElementById('filter-lbl').firstChild.classList.remove('fa-circle-exclamation');
      document.getElementById('filter-lbl').firstChild.classList.add('fa-circle-check');
      break;
    case 'Pending':
      document.getElementById('filter-lbl').firstChild.classList.remove('fa-asterisk');
      document.getElementById('filter-lbl').firstChild.classList.add('fa-circle-exclamation');
      document.getElementById('filter-lbl').firstChild.classList.remove('fa-circle-check');
      break;

    default:
      break;
  }
}
