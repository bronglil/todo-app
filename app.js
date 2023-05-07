// Get references to DOM elements
const newTaskInput = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add existing tasks to the task list
tasks.forEach(task => {
  const taskItem = createTaskItem(task);
  taskList.appendChild(taskItem);
});

// Event listeners
addTaskBtn.addEventListener('click', addTask);

// Functions
function addTask() {
  const taskName = newTaskInput.value.trim();
  
  // Make sure the task name is not empty
  if (taskName === '') {
    alert('Please enter a task name');
    return;
  }
  
  // Add the task to the tasks array
  tasks.push(taskName);
  
  // Save the tasks to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
  
  // Create a new task item and add it to the task list
  const taskItem = createTaskItem(taskName);
  taskList.appendChild(taskItem);
  
  // Clear the input field
  newTaskInput.value = '';
}

function createTaskItem(taskName) {
  const taskItem = document.createElement('li');
  
  // Add the task name to the task item
  const taskNameSpan = document.createElement('span');
  taskNameSpan.innerText = taskName;
  taskItem.appendChild(taskNameSpan);
  
  // Add edit button to the task item
  const editBtn = document.createElement('button');
  editBtn.innerText = 'Edit';
  editBtn.addEventListener('click', () => {
    const newTaskName = prompt('Enter a new name for the task', taskName);
    
    // Make sure the new task name is not empty
    if (newTaskName === null || newTaskName.trim() === '') {
      return;
    }
    
    // Update the task name in the tasks array
    const taskIndex = tasks.indexOf(taskName);
    tasks[taskIndex] = newTaskName;
    
    // Save the tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Update the task name in the task item
    taskNameSpan.innerText = newTaskName;
  });
  taskItem.appendChild(editBtn);
  
  // Add remove button to the task item
  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'Remove';
  removeBtn.addEventListener('click', () => {
    // Remove the task from the tasks array
    const taskIndex = tasks.indexOf(taskName);
    tasks.splice(taskIndex, 1);
    
    // Save the tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Remove the task item from the task list
    taskList.removeChild(taskItem);
  });
  taskItem.appendChild(removeBtn);
  
  return taskItem;
}
