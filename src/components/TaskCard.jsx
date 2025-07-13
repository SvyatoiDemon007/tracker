import React from 'react';

function TaskCard({ task, onUpdate, onDelete, onSelect }) {
    const { title, description, startDate, endDate, status } = task;

    return (
        <div
            onClick={() => onSelect(task)}
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
                cursor: 'pointer'
            }}
        >
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            <p><strong>Начало:</strong> {startDate || '—'}</p>
            <p><strong>Конец:</strong> {endDate || '—'}</p>
            <p><strong>Статус:</strong> {status}</p>

            { }
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id);
                }}
                style={{ marginTop: '5px', background: 'red', color: 'white' }}
            >
                Удалить
            </button>
        </div>
    );
}

export default TaskCard;