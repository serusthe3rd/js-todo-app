// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

// Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(e) {
  // Preventing the form from submitting automaticaly
  e.preventDefault();
  // Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Creating LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  // Appending the new LI inside of the new DIV
  todoDiv.appendChild(newTodo);
  // Add todo to local storage
  saveLocalTodo(todoInput.value);
  // CHECKED button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  // Appending the new BUTTON inside of the new DIV
  todoDiv.appendChild(completedButton);
  // TRASH button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  // Appending the new BUTTON inside of the new DIV
  todoDiv.appendChild(trashButton);
  // Append the whole new DIV to the TODO LIST
  todoList.appendChild(todoDiv);
  // Clear todoInput value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // Deleting the todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // Checking the todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodo(todo) {
  // Check
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Creating LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    // Appending the new LI inside of the new DIV
    todoDiv.appendChild(newTodo);
    // CHECKED button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    // Appending the new BUTTON inside of the new DIV
    todoDiv.appendChild(completedButton);
    // TRASH button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    // Appending the new BUTTON inside of the new DIV
    todoDiv.appendChild(trashButton);
    // Append the whole new DIV to the TODO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
