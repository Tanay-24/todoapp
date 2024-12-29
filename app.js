// Get references to DOM elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// In-memory array to store tasks (in place of MongoDB for simplicity here)
let tasks = [];

// Function to display tasks
function displayTasks() {
  taskList.innerHTML = '';  // Clear current task list
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task.name} 
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Add a new task when form is submitted
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent form submission from refreshing the page
  
  const taskName = taskInput.value.trim();
  if (taskName) {
    // Add the task to the tasks array
    tasks.push({ name: taskName });
    taskInput.value = '';  // Clear the input field
    
    // Display the updated task list
    displayTasks();
  }
});

// Delete a task by index
function deleteTask(index) {
  // Remove the task from the tasks array
  tasks.splice(index, 1);
  
  // Display the updated task list
  displayTasks();
}

// Initial task display (in case there are tasks already in the array)
displayTasks();
