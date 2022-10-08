import { TodoInterface } from "../interfaces";


export const LocalStorageSet = (Tasks: TodoInterface[], Completed: TodoInterface[]) => {
    localStorage.setItem(
        "Todo_data",
        JSON.stringify({Tasks:Tasks, Completed:Completed})
    )
}

