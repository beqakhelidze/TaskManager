import React from "react";
import SingleTask from "./SingleTask";
import { TodoInterface } from "../interfaces";
import { LocalStorageSet } from "../TsFunctions";
import {
    Grid,
    Text,
    Box
} from "@mantine/core";
import {
    DragDropContext, Droppable, DropResult
} from "react-beautiful-dnd";


interface Props {
    Tasks: TodoInterface[],
    setTasks: React.Dispatch<React.SetStateAction<TodoInterface[]>>,
    Completed: TodoInterface[],
    setCompleted: React.Dispatch<React.SetStateAction<TodoInterface[]>>,
}

const Todos: React.FC<Props> = ({ Tasks, setTasks, Completed, setCompleted }) => {

    const onDragEnd = (result: DropResult) => {

        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && destination.index === source.index) {
            return;
        }

        let add; let active = Tasks; let completed = Completed;

        if (source.droppableId == "TodoList") {
            add = active[source.index];
            active.splice(source.index, 1);
        } else {
            add = completed[source.index];
            completed.splice(source.index, 1);
        }

        if (destination.droppableId == "TodoList") {
            active.splice(destination.index, 0, add);
        } else {
            completed.splice(destination.index, 0, add);
        }

        LocalStorageSet(active,completed);

        setTasks(active);
        setCompleted(completed);
    }

    const handleDone = (index: number, indicator: string) => {

        let newTasks = Tasks, newCompleted = Completed;

        if (indicator == "Completed") {
            const Value = Completed[index];
            newCompleted.splice(index, 1);
            newTasks = [...newTasks, Value];
        } else {
            const Value = Tasks[index];
            newTasks.splice(index, 1);
            newCompleted = [...newCompleted, Value];
        }
        setTasks(newTasks);
        setCompleted(newCompleted);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={() => { }}>
            <Grid align="flex-start" justify="center">
                <Grid.Col span={6}>
                    <Droppable droppableId="TodoList">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    minHeight: 200,
                                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                    padding: "10px 5px",
                                    margin:"15px 5px"
                                }}
                            >
                                <Text color="gray" size="xl" weight={700}>Tasks</Text>

                                {Tasks && Tasks.map((task, index) => (
                                    <SingleTask
                                        index={index}
                                        key={task.id}
                                        id={task.id}
                                        todo={task.todo}
                                        setTasks={setTasks}
                                        handleDone={handleDone}
                                        indicator="Todo"
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                </Grid.Col>
                <Grid.Col span={6}>
                    <Droppable droppableId="CompletedList">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    minHeight: 200, 
                                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                    padding: "10px 5px",
                                    margin:"15px 5px"
                                }}
                            >
                                <Text color="gray" size="xl" weight={700}>Completed</Text>
                                {Completed && Completed.map((task, index) => (
                                    <SingleTask
                                        index={index}
                                        key={task.id}
                                        id={task.id}
                                        todo={task.todo}
                                        setTasks={setCompleted}
                                        handleDone={handleDone}
                                        indicator="Completed"
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Grid.Col>
            </Grid>
        </DragDropContext >
    )
}


export default Todos;