import React from 'react';

const TaskFilter = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="task-filter">
            <button className={currentFilter === 'all' ? 'active' : ''} onClick={() => onFilterChange('all')}>All</button>
            <button className={currentFilter === 'completed' ? 'active' : ''} onClick={() => onFilterChange('completed')}>Completed</button>
            <button className={currentFilter === 'incomplete' ? 'active' : ''} onClick={() => onFilterChange('incomplete')}>Incomplete</button>
        </div>
    );
};


export default TaskFilter;