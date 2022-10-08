import React, { useRef, useEffect } from "react";
import { Edit, Check, X } from 'tabler-icons-react';
import DeleteSVG from "../assets/DeleteSVG";
import {
    Group,
    ThemeIcon,
    Paper
} from "@mantine/core";


interface Props {
    index: number,
    id: number,
    handleDone: (id: number, indicator: string) => void,
    indicator: "Completed" | "Todo",
    setEditable: React.Dispatch<React.SetStateAction<boolean>>,
    handleDelete: (id: number) => void,
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>,
}

const SingleTaskSettings: React.FC<Props> = ({
    id,
    index,
    handleDone,
    indicator,
    setEditable,
    handleDelete,
    setShowSettings }) => {

    const Ref = useRef<HTMLInputElement | null>(null);


    const handleClick = (event: any) => {
        if (Ref.current && !Ref.current.contains(event.target)) {
                setShowSettings(false);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener("click", handleClick);
        }, 10);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (

        <Paper
            shadow="xs"
            radius={5}
            ref={Ref}
            p="sm" style={{
                position: "absolute",
                right: "0px",
            }}>

            <Group >
                <ThemeIcon
                    radius="lg"
                    p={1}
                    size="sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDone(index, indicator)}
                >
                    {indicator == "Todo" ?
                        <Check
                            size={60}
                            strokeWidth={2}
                            color={'#fff'}
                        /> :
                        <X
                            size={48}
                            strokeWidth={2}
                            color={'#fff'}
                        />}
                </ThemeIcon>
                <ThemeIcon
                    radius="lg"
                    p={1}
                    size="sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setEditable((prev) => {
                            return !prev;
                        });
                    }}
                >
                    <Edit
                        size={60}
                        strokeWidth={2}
                        color={'#fff'}
                    />
                </ThemeIcon>
                <ThemeIcon
                    radius="lg"
                    p={1}
                    size="sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(id)}
                >
                    <DeleteSVG
                        size={60}
                        strokeWidth={2}
                        color={'#fff'}
                    />
                </ThemeIcon>
            </Group>
        </Paper>
    )
}

export default SingleTaskSettings;