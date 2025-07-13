import React from 'react';

function TaskFilter({ searchText, setSearchText, dateFrom, setDateFrom, dateTo, setDateTo }) {
    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Поиск по названию"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                title="Начальная дата"
            />
            <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                title="Конечная дата"
            />
        </div>
    );
}

export default TaskFilter;