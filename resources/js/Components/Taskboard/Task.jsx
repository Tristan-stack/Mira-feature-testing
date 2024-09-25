import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Task = ({ task, index, listId, deleteTask }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-2 mb-2 bg-white rounded shadow flex justify-between items-center ${snapshot.isDragging ? 'bg-green-200' : ''}`}
                >
                    {task.content}
                    <FontAwesomeIcon
                        icon={faTimes}
                        onClick={() => deleteTask(listId, task.id)}
                        className="text-red-500 cursor-pointer ml-2"
                    />
                </div>
            )}
        </Draggable>
    );
};

export default Task;
