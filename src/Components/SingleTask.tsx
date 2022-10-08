import React, { useState } from "react";
import { Dots } from 'tabler-icons-react';
import { TodoInterface } from "../interfaces";
import EditInput from "./EditInput";
import SingleTaskSettings from "./SingleTaskSettings";
import {
    Card,
    Text,
    Grid,
    ThemeIcon,
    Group
} from '@mantine/core';
import { Draggable } from "react-beautiful-dnd";
import { useHover, useToggle } from '@mantine/hooks';

interface Props {
    index: number,
    id: number,
    todo: string,
    setTasks: React.Dispatch<React.SetStateAction<TodoInterface[]>>,
    handleDone: (id: number, indicator: string) => void,
    indicator: "Completed" | "Todo"
}


const SingleTask: React.FC<Props> = ({ id, todo, index, setTasks, handleDone, indicator }) => {

    const [isEditable, setEditable] = useState(false);

    const [ShowSettings, setShowSettings] = useToggle<boolean>(false, [false, true]);;

    const { hovered, ref } = useHover();

    const handleDelete = (id: number) => {
        setTasks((prevState: TodoInterface[]) => {
            return prevState.filter((task: TodoInterface) => task.id != id)
        })
    }

    const HandleEdit = (id: Number, text: string) => {
        setTasks((prevState: TodoInterface[]) => {
            return prevState.map((task: TodoInterface) => {
                if (task.id == id) {
                    return { ...task, todo: text }
                } else {
                    return task;
                }
            })
        })
    }

    return (
        <Draggable draggableId={id.toString()} index={index} >
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Card
                        p="xl"
                        m="lg"
                        radius={4}
                        style={{
                            cursor: "pointer",
                            overflow:"visible",
                            boxShadow: hovered ? "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                                : "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                            transform: hovered ? "scale(1.01)" : "none",
                        }}
                        ref={ref}
                    >
                        {isEditable ? (
                            <EditInput
                                id={id}
                                HandleEdit={HandleEdit}
                                setEditable={setEditable}
                                value={todo}
                            />
                        ) : (
                            <Grid align="flex-start">
                                <Grid.Col span={11}>
                                    <Text size="sm" align="left" style={{wordWrap: "break-word"}}>
                                        {todo}
                                    </Text>
                                </Grid.Col>

                                <Grid.Col span={1} p={0}>
                                    <Group position="center">
                                        <ThemeIcon
                                            radius={50}
                                            onClick={() => setShowSettings()}
                                        >
                                            <Dots
                                                size={48}
                                                strokeWidth={2}
                                                color={'white'}
                                            />
                                        </ThemeIcon>
                                    </Group>
                                    {ShowSettings && <SingleTaskSettings
                                        id={id}
                                        index={index}
                                        handleDone={handleDone}
                                        indicator={indicator}
                                        setEditable={setEditable}
                                        handleDelete={handleDelete}
                                        setShowSettings = {setShowSettings}
                                    />}
                                </Grid.Col>
                            </Grid >
                        )}
                    </Card >
                </div>
            )}
        </Draggable>
    )
}

export default SingleTask;