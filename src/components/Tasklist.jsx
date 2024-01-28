import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import TaskItem from './TaskItem';

const Tasklist = ({ tasks, onDeleteTask, onToggleTaskStatus ,setTasks }) => {
    const reorderTasks = (startIndex, endIndex) => {
        const result = Array.from(tasks);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        setTasks(result);
      };
      
  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <DroppableTaskItem
            key={task.id}
            task={task}
            index={index}
            onDeleteTask={onDeleteTask}
            onToggleTaskStatus={onToggleTaskStatus}
            onReorderTasks={reorderTasks}
          />
        ))
      ) : (
        <div className="empty-message">No tasks available at this moment! , Add new Task</div>
      )}
    </div>
  );
};

const DroppableTaskItem = ({ task, index, onDeleteTask, onToggleTaskStatus, onReorderTasks }) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: 'task',
        hover(item, monitor) {
          if (!ref.current) {
            return;
          }
    
          const dragIndex = item.index;
          const hoverIndex = index;
          if (dragIndex === hoverIndex) {
            return;
          }
          const hoverBoundingRect = ref.current.getBoundingClientRect();
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    
          const clientOffset = monitor.getClientOffset();
    
          const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;
    
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
    
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
    
          onReorderTasks(dragIndex, hoverIndex);
          item.index = hoverIndex;
        },
      });
    
      drop(ref);

  return (
    <div ref={ref}>
      <TaskItem
        task={task}
        index={index}
        onDeleteTask={onDeleteTask}
        onToggleTaskStatus={onToggleTaskStatus}
      />
    </div>
  );
};

export default Tasklist;
