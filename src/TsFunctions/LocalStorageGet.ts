
import { useLocalStorage } from '@mantine/hooks';

const DefaultValue = {
    Tasks:[],
    Completed:[],
}

export const LocalStorageGet = () => {
    
    const Storage = localStorage.getItem("Todo_data");
    if (!Storage){
        localStorage.setItem(
            "Todo_data",
            JSON.stringify(DefaultValue)
        )
        return DefaultValue;
    }else{
        return JSON.parse(Storage);
    }
}

