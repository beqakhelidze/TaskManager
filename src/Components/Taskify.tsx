import React, { useEffect, useState } from "react";
import { useToggle } from '@mantine/hooks';
import { TodoInterface } from "../interfaces";
import Todos from "./Todos";
import TaskInput from "./TextInput";
import { LocalStorageSet, LocalStorageGet } from "../TsFunctions";
import LightAndDarkModeButton from "./LightDarkButton";
import {
    Title,
    Text,
} from '@mantine/core';

const Taskify: React.FC = () => {

    const [Tasks, setTasks] = useState<TodoInterface[]>([]);

    const [Completed, setCompleted] = useState<TodoInterface[]>([]);

    const [isUpdated, setIsUpdated] = useState<boolean>(false);

    useEffect(() => {

        if (!isUpdated) {
            const Data = LocalStorageGet();
            setTasks(Data.Tasks);
            setCompleted(Data.Completed);
        } else {
            LocalStorageSet(Tasks, Completed);
        }

        setIsUpdated(true);
    }, [Completed, Tasks]);

    const handleAdd = (Value: string): void => {
        setTasks([...Tasks, { id: Date.now(), todo: Value }])
    }

    return (
        <>
            <LightAndDarkModeButton />
            <Text color="gray">
                <Title order={1} style={{ fontFamily: "Smooch", margin:"25px"}}>Taskify</Title>
            </Text>
            <TaskInput handleAdd={handleAdd} />
            <Todos Tasks={Tasks} Completed={Completed} setTasks={setTasks} setCompleted={setCompleted} />
        </>
    )
}

export default Taskify;