// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
	// Prevent form from submitting
	event.preventDefault();
	// Todo DIV
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	// Create LI
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	// Append LI to DIV
	todoDiv.appendChild(newTodo);
	// Add todo to local storage
	saveLocalTodos(todoInput.value);
	// Check mark COMPLETE BUTTON
	const completeButton = document.createElement('button');
	completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
	completeButton.classList.add('complete-btn');
	// Append COMPLETE BUTTON to DIV
	todoDiv.appendChild(completeButton);
	// Check mark DELETE BUTTON
	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
	deleteButton.classList.add('delete-btn');
	// Append DELETE BUTTON to DIV
	todoDiv.appendChild(deleteButton);
	// Append to List
	todoList.appendChild(todoDiv);
	// Clear Todo Input value
	todoInput.value = "";
}

function deleteCheck(event) {
	const item = event.target;

	// Delete
	if (item.classList[0] === "delete-btn") {
		const todo = item.parentElement;
		// Animation
		todo.classList.add("fall");
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', () => {
			todo.remove();
		});
	}

	// Complete
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
				todo.style.display = 'flex';
				break;
			case "completed":
				if (todo.classList.contains("completed")) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case "uncompleted":
				if (!todo.classList.contains("completed")) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}

function saveLocalTodos(todo) {
	// Check
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function (todo) {
		// Todo DIV
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo');
		// Create LI
		const newTodo = document.createElement('li');
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');
		// Append LI to DIV
		todoDiv.appendChild(newTodo);
		// Check mark COMPLETE BUTTON
		const completeButton = document.createElement('button');
		completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
		completeButton.classList.add('complete-btn');
		// Append COMPLETE BUTTON to DIV
		todoDiv.appendChild(completeButton);
		// Check mark DELETE BUTTON
		const deleteButton = document.createElement('button');
		deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
		deleteButton.classList.add('delete-btn');
		// Append DELETE BUTTON to DIV
		todoDiv.appendChild(deleteButton);
		// Append to List
		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}
