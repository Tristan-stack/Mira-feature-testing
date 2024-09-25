import React, { useState } from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const TaskList = ({ listId, tasks, deleteList, addTask, deleteTask }) => {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');

    const handleTaskNameChange = (e) => {
        setNewTaskName(e.target.value);
    };

    const confirmAddTask = () => {
        if (newTaskName.trim()) {
            addTask(listId, newTaskName);
            setNewTaskName('');
            setIsAddingTask(false);
        } else {
            alert("Le contenu de la tâche ne peut pas être vide.");
        }
    };

    return (
        <div className="bg-white rounded shadow p-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{listId}</h3>
                <button onClick={() => deleteList(listId)} className="text-red-500">✖</button>
            </div>

            <Droppable droppableId={listId} type="task">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} deleteTask={deleteTask} listId={listId} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {isAddingTask ? (
                <div className="mt-4">
                    <input
                        type="text"
                        value={newTaskName}
                        onChange={handleTaskNameChange}
                        placeholder="Nom de la tâche"
                        className="border p-2 rounded w-full"
                    />
                    <button
                        onClick={confirmAddTask}
                        className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
                    >
                        Ajouter
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsAddingTask(true)}
                    className="mt-4 bg-blue-500 text-white py-1 px-2 rounded"
                >
                    Ajouter une tâche
                </button>
            )}
        </div>
    );
};

export default TaskList;
