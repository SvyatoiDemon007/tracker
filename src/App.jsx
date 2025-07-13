import React, { useState, useEffect } from 'react';
import './App.css';
import AddTaskForm from './components/AddTaskForm';
import TaskColumn from './components/TaskColumn';
import TaskSidebar from './components/TaskSidebar';
import TaskFilter from './components/TaskFilter';

const STATUSES = ['todo', 'in_progress', 'ready'];

function isTaskInDateRange(task, from, to) {
  const start = task.startDate ? new Date(task.startDate).toISOString().slice(0, 10) : '';
  const end = task.endDate ? new Date(task.endDate).toISOString().slice(0, 10) : '';

  if (!start && !end) return true;

  const fromDate = from || '0000-01-01';
  const toDate = to || '9999-12-31';

  if (end) {
    return !(end < fromDate || start > toDate);
  }

  return start >= fromDate && start <= toDate;
}

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const closeSidebar = () => setSelectedTask(null);

  const [searchText, setSearchText] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => setTasks([...tasks, newTask]);

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesText = task.title.toLowerCase().includes(searchText.toLowerCase());
    const inDateRange = isTaskInDateRange(task, dateFrom, dateTo);
    return matchesText && inDateRange;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Трекер задач</h1>

      <TaskFilter
        searchText={searchText}
        setSearchText={setSearchText}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
      />

      <AddTaskForm onAdd={addTask} />

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {STATUSES.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={filteredTasks.filter((t) => t.status === status)}
            onUpdate={updateTask}
            onDelete={deleteTask}
            onSelect={setSelectedTask}
          />
        ))}
      </div>

      {selectedTask && (
        <TaskSidebar
          task={selectedTask}
          onClose={closeSidebar}
          onUpdate={(updatedTask) => {
            updateTask(updatedTask);
            closeSidebar();
          }}
        />
      )}
    </div>
  );
}

export default App;