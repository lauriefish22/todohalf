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
    const formData = new FormData(todoForm);
    const todo = formData.get('todo');
    // on submit,
    // create a todo in supabase using for data
    await createTodo(todo);
    todoForm.reset();

    // reset the form DOM element
    // and display the todos
    fetchAndDisplayItems();
});

window.addEventListener('load', async () => {
    // fetch the todos and store in state
    // call displayTodos
});

async function fetchAndDisplayItems() {
    todos = await getTodos();
    todosEl.textContent = '';
    

    for (let todo of todos) {
        const todosAdded = renderTodo(todo);

        todosAdded.addEventListener('click', async () => {
            await completeTodo(todo.id);

            fetchAndDisplayItems();
        });

        todosEl.append(todosAdded);
    }
}

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    // delete all todos
    deleteAllTodos();
    fetchAndDisplayItems();
    // then refetch and display the updated list of todos
});
