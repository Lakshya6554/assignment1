import React, { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
    const [taskName, setTaskName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskName) {
            alert('Enter valid name for task');
            return;
        }
        onAddTask({ id: Date.now(), name: taskName, date: new Date().toLocaleDateString(), completed: false });
        setTaskName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add new task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTaskForm;