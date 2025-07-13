import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddTaskForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(() =>
        new Date().toISOString().slice(0, 16)
    );
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('todo');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Введите название задачи');
            return;
        }

        const newTask = {
            id: uuidv4(),
            title,
            description,
            startDate,
            endDate,
            status,
        };

        onAdd(newTask);

        setTitle('');
        setDescription('');
        setStartDate(new Date().toISOString().slice(0, 16));
        setEndDate('');
        setStatus('todo');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
                type="text"
                placeholder="Название задачи"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Описание задачи"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="ready">Ready</option>
            </select>
            <button type="submit">Добавить задачу</button>
        </form>
    );
}

export default AddTaskForm;