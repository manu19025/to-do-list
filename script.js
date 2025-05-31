document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const timeInput = document.getElementById('taskTime');
  const taskText = taskInput.value.trim();
  const taskTime = timeInput.value;
  if (!taskText) return alert("Please enter a task.");
  if (!taskTime) return alert("Please enter a time for the task.");

  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');

  li.innerHTML = `<div class="task-info">
    <span>${taskText}</span>
    <span class="task-time">Reminder at: ${taskTime}</span>
  </div>
  <span class="task-actions">
    <button onclick="toggleComplete(this)">✔</button>
    <button onclick="deleteTask(this)">✖</button>
  </span>`;
  taskList.appendChild(li);
  scheduleNotification(taskText, taskTime);
  taskInput.value = '';
  timeInput.value = '';
}

function toggleComplete(btn) {
  const li = btn.parentElement.parentElement;
  li.classList.toggle('completed');
}

function deleteTask(btn) {
  const li = btn.parentElement.parentElement;
  li.remove();
}

function scheduleNotification(text, timeStr) {
  const [hour, minute] = timeStr.split(':');
  const now = new Date();
  const target = new Date();
  target.setHours(+hour);
  target.setMinutes(+minute);
  target.setSeconds(0);

  const timeout = target.getTime() - now.getTime();
  if (timeout > 0) {
    setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('To-Do Reminder', { body: text });
      } else {
        alert('Reminder: ' + text);
      }
    }, timeout);
  }
}

if (Notification && Notification.permission !== 'granted') {
  Notification.requestPermission();
}
