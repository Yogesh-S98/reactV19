import { useState } from "react"
import DataContext from "./Datacontext";


const DataProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        setItems([...items, { id: Date.now(), ...item }]);
    };

    const updateItem = (id, updatedItem) => {
        setItems(items.map(item => (item.id === id ? { ...item, ...updatedItem } : item)));
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };
    return (
        <DataContext.Provider value={{items, addItem, updateItem, deleteItem}}>
            {children}
        </DataContext.Provider>
    )
};

export default DataProvider;