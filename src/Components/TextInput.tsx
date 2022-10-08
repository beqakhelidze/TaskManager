import React, { useState, useRef, FormEvent } from "react";
import { Plus } from 'tabler-icons-react';
import {
    TextInput,
    ActionIcon
} from '@mantine/core';

interface Props {
    handleAdd: (Value: string) => void
}


const TaskInput: React.FC<Props> = ({ handleAdd }) => {

    const [todo, setTodo] = useState<string>("");

    const [error, setError] = useState<boolean | string>(false);

    const inputRef = useRef<HTMLInputElement>(document.createElement("input"));

    const handleClick = (event:FormEvent) =>{
        event.preventDefault();

        const Value = inputRef.current.value;  

        if (!Value){
            setError("Please enter valid Task!");
        }else{
            handleAdd(Value)
        }
    }

    return (
        <form onSubmit={handleClick}>
            <TextInput
                variant="default"
                radius={10}
                rightSectionWidth={70}
                m={10}
                error={error}
                size="lg"
                value={todo}
                ref={inputRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTodo(e.currentTarget.value);
                    setError(false);
                }}
                rightSection={
                    <ActionIcon
                        radius={100}
                        variant="light"
                        size="lg"
                        onClick={handleClick}
                    >
                        <Plus
                            size={24}
                            strokeWidth={2}
                            color={"orange"}
                        />
                    </ActionIcon>
                }
            />
        </form>
    )
}

export default TaskInput;