import React from 'react';
import TaskCard from './TaskCard';

function TaskColumn({ status, tasks, onUpdate, onDelete, onSelect }) {
    return (
        <div style={{ flex: 1 }}>
            <h2>
                {status === 'todo'
                    ? 'To Do'
                    : status === 'in_progress'
                        ? 'In Progress'
                        : 'Ready'}
            </h2>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}

export default TaskColumn;