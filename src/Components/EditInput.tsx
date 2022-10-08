import React, { useRef, useEffect, useState } from "react";
import {
    TextInput
} from "@mantine/core";

interface Props {
    id: number,
    value: string,
    setEditable: React.Dispatch<React.SetStateAction<boolean>>,
    HandleEdit: (id: number, text: string) => void
}

const EditInput: React.FC<Props> = ({ id, value, setEditable, HandleEdit }) => {

    const inputRef = useRef<HTMLInputElement>(document.createElement("input"));

    const [Value, setValue] = useState<string>(value);

    const handleClick = (event: any) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            if (inputRef.current.value) {
                HandleEdit(id, inputRef.current.value);
            } 
            setEditable(false);
        }
    }

    useEffect(() => {
        inputRef.current.focus();

        setTimeout(() => {
            document.addEventListener("click", handleClick);
        }, 10);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);


    return (
        <TextInput
            ref={inputRef}
            value={Value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
        />
    )
}

export default EditInput;