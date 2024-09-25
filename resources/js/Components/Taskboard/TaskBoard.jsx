import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskList from './TaskList';
import { getInitialData, reorder } from '../Taskboard/utils/utils';

class TaskBoard extends Component {
    constructor(props) {
        super(props);
        this.state = getInitialData();

        this.onDragEnd = this.onDragEnd.bind(this);
        this.handleAddListClick = this.handleAddListClick.bind(this);
        this.handleListNameChange = this.handleListNameChange.bind(this);
        this.confirmAddList = this.confirmAddList.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    onDragEnd(result) {
        const { source, destination, type } = result;

        if (!destination) return;

        if (type === 'list') {
            // Déplacement des listes (tableaux)
            const newListOrder = Array.from(this.state.listOrder);
            const [movedList] = newListOrder.splice(source.index, 1);
            newListOrder.splice(destination.index, 0, movedList);

            this.setState({
                listOrder: newListOrder,
            });
        } else if (type === 'task') {
            // Déplacement des tâches entre les listes
            if (source.droppableId === destination.droppableId) {
                const tasks = reorder(
                    this.state.tasks[source.droppableId],
                    source.index,
                    destination.index
                );

                this.setState((prevState) => ({
                    tasks: {
                        ...prevState.tasks,
                        [source.droppableId]: tasks,
                    },
                }));
            } else {
                const sourceTasks = Array.from(this.state.tasks[source.droppableId]);
                const [movedTask] = sourceTasks.splice(source.index, 1);
                const destinationTasks = Array.from(this.state.tasks[destination.droppableId]);
                destinationTasks.splice(destination.index, 0, movedTask);

                this.setState((prevState) => ({
                    tasks: {
                        ...prevState.tasks,
                        [source.droppableId]: sourceTasks,
                        [destination.droppableId]: destinationTasks,
                    },
                }));
            }
        }
    }

    handleAddListClick() {
        this.setState({ isAddingList: true });
    }

    handleListNameChange(e) {
        this.setState({ newListName: e.target.value });
    }

    confirmAddList() {
        const { newListName, listOrder, tasks } = this.state;
        if (newListName.trim() && !listOrder.includes(newListName)) {
            this.setState({
                tasks: { ...tasks, [newListName]: [] },
                listOrder: [...listOrder, newListName],
                newListName: '',
                isAddingList: false,
            });
        } else {
            alert("Le nom de la liste est vide ou déjà utilisé.");
        }
    }

    addTask(listId, newTaskName) {
        const newTaskId = `task-${Date.now()}`;

        this.setState((prevState) => ({
            tasks: {
                ...prevState.tasks,
                [listId]: [...prevState.tasks[listId], { id: newTaskId, content: newTaskName }],
            },
        }));
    }

    deleteTask(listId, taskId) {
        this.setState((prevState) => ({
            tasks: {
                ...prevState.tasks,
                [listId]: prevState.tasks[listId].filter(task => task.id !== taskId),
            },
        }));
    }

    deleteList(listId) {
        this.setState((prevState) => {
            const newTasks = { ...prevState.tasks };
            delete newTasks[listId];

            return {
                tasks: newTasks,
                listOrder: prevState.listOrder.filter(id => id !== listId),
            };
        });
    }

    render() {
        return (
            <div className="p-4">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                        {(provided) => (
                            <div
                                className="flex space-x-4"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {this.state.listOrder.map((listId, index) => (
                                    <Draggable key={listId} draggableId={listId} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <TaskList
                                                    key={listId}
                                                    listId={listId}
                                                    tasks={this.state.tasks[listId]}
                                                    deleteList={this.deleteList}
                                                    addTask={this.addTask}
                                                    deleteTask={this.deleteTask}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {this.state.isAddingList ? (
                    <div className="mt-4">
                        <input
                            type="text"
                            value={this.state.newListName}
                            onChange={this.handleListNameChange}
                            placeholder="Nom de la liste"
                            className="border p-2 rounded w-full"
                        />
                        <button
                            onClick={this.confirmAddList}
                            className="mt-2 bg-green-500 text-white py-1 px-2 rounded"
                        >
                            Confirmer
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={this.handleAddListClick}
                        className="mt-4 bg-green-500 text-white py-1 px-2 rounded"
                    >
                        Ajouter une liste
                    </button>
                )}
            </div>
        );
    }
}

export default TaskBoard;
