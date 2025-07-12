 document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    // LocalStorage se pehle se stored tasks nikaal lo (agar hain toh)
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Saved tasks ko render karo (screen par dikhana)
    tasks.forEach((task) => renderTask(task));

    // Jab "Add Task" button dabao
    addTaskButton.addEventListener("click", () => {
      const taskText = todoInput.value.trim();
      if (taskText === "") return; // Khali input pe kuch mat karo

      const newTask = {
        id: Date.now(),     // Unique ID
        text: taskText,     // User ka input
        completed: false    // Naya task incomplete hota hai
      };

      tasks.push(newTask);     // Array me add karo
      saveTasks();             // LocalStorage me save karo
      renderTask(newTask);     // Screen par dikhana
      todoInput.value = "";    // Input field khali karo
    });

    // Screen par task dikhane ka function
    function renderTask(task) {
      const li = document.createElement('li');
      li.setAttribute('data-id', task.id);  // Custom attribute (not visible)

      if (task.completed) {
        li.classList.add('completed');  // Line-through agar complete ho
      }

      // Task ke text ke saath delete button
      li.innerHTML = `<span>${task.text}</span> <button>delete</button>`;

      // Task pe click karne se complete/incomplete toggle karo
      li.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') return; // Delete button pe click hua toh skip karo
        task.completed = !task.completed;          // Status badlo
        li.classList.toggle('completed');          // Class toggle karo
        saveTasks();                               // LocalStorage me update
      });

      // Delete button pe click karne se task delete ho
      li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();  // Parent (li) ko event na mile
        tasks = tasks.filter(t => t.id !== task.id); // Task array se hata do
        li.remove();          // HTML se hata do
        saveTasks();          // LocalStorage me bhi hata do
      });

      // Final step: ul ke andar li dikhana
      todoList.appendChild(li);
    }

    // Array ko localStorage me save karne ka kaam
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));  
    }
});