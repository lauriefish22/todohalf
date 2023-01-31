import {
    checkAuth,
    createTodo,
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos,
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

// let some todo state (an array)
let todos = [];

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    FormData.textContent = '';

    // on submit,
    // create a todo in supabase using for data
    const data = new FormData(todoForm);
    await createTodo(data.get('todo'));
    // reset the form DOM element
    // and display the todos
    fetchAndDisplayItems();
});

async function fetchAndDisplayItems() {
    // clear the container (.textContent = '')
    todosEl.textContext = '';
    // fetch the user's todos from supabase
    const todos = await getTodos();
    todoDataArr = todos;

    // loop through the user's todos
    for (let todo of todoDataArr) {
        const todosAdded = renderTodo(todo);
        todosAdded.addEventListener('click', async () => {
            await completeTodo(todo.id);
            fetchAndDisplayItems();
        });
        todosEl.append(todosAdded);
    }
}
// for each todo, render a new todo DOM element using your render function
// then add an event listener to each todo
// on click, update the todo in supabase
// then (shockingly!) call displayTodos() to refresh the list
// append the rendered todo DOM element to the todosEl

window.addEventListener('load', async () => {
    // fetch the todos and store in state
    // call displayTodos
    fetchAndDisplayItems();
});

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    // delete all todos
    deleteAllTodos();
    fetchAndDisplayItems();
    // then refetch and display the updated list of todos
});
