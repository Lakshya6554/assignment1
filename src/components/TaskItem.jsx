import React from 'react';
import { useDrag } from 'react-dnd';

const TaskItem = ({ task, index, onDeleteTask, onToggleTaskStatus }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task.id, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`task-item ${task.completed ? 'completed' : ''} ${isDragging ? 'dragging' : ''}`}
    >
      <h3>{task.name}</h3>
      <p>Added on: {task.date}</p>
      <button onClick={() => onToggleTaskStatus(task.id)}>Mark as {task.completed ? 'Incomplete' : 'Completed'}</button>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
