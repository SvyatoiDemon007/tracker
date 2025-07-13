import React, { useState, useEffect } from 'react';

function TaskSidebar({ task, onUpdate, onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('todo');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setStartDate(task.startDate || '');
            setEndDate(task.endDate || '');
            setStatus(task.status || 'todo');
        }
    }, [task]);

    const handleSave = () => {
        const updatedTask = {
            ...task,
            title,
            description,
            startDate,
            endDate,
            status,
        };
        onUpdate(updatedTask);
    };

    return (
        <div style={{
            position: 'fixed',
            right: 0,
            top: 0,
            height: '100vh',
            width: '300px',
            background: '#fff',
            borderLeft: '1px solid #ccc',
            padding: '20px',
            boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
            overflowY: 'auto',
            zIndex: 999
        }}>
            <h2>Редактировать задачу</h2>
            <input
                type="text"
                placeholder="Название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ marginTop: '10px' }}
            />
            <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ marginTop: '10px' }}
            />
            <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ marginTop: '10px' }}
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ marginTop: '10px' }}
            >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="ready">Ready</option>
            </select>

            <div style={{ marginTop: '20px' }}>
                <button onClick={handleSave} style={{ marginRight: '10px' }}>
                    Сохранить
                </button>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
}

export default TaskSidebar;