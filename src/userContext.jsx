import { createContext, useEffect, useState } from "react"
import { createUser, deleteUser, getList, updateUser } from "./service";
import { useNotification } from "./notification";
import { useLoading } from "./loader";


export const DataContext = createContext();

const UsersProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const { showNotification } = useNotification();
    const { showLoading, hideLoading }= useLoading();
    const [pagination, SetPagination] = useState({
        current: 1,
        pageSize: 7,
        total: 0,
    });
    const [metaData, setMetaData] = useState({});


    const handleApiCall = async (apiFunc) => {
        showLoading();
        try {
            const result = await apiFunc();
            console.log('res', result);
            if (result?.data?.success) {
                showNotification("success", "", result.data.message);
                loadList();
                return true;
            }
        } catch (error) {
            console.error("API Error:", error);
        } finally {
            hideLoading();
        }
        return false;
    };

    const loadList = async () => {
        showLoading();
        try {
            const page = { pageIndex: pagination.current - 1, pageSize: pagination.pageSize };
            const res = await getList(page);
            // console.log('aaa', page);
            console.log('resp', res);
            if (res) {
                setItems(res.data?.data?.response);
                const setPage = {
                    current: res.data?.data?.metaData.pageNumber + 1,
                    pageSize: res.data?.data?.metaData.pageSize,
                    total: res.data?.data?.metaData.totalRecords,
                };
                console.log('meta', setPage);
                setMetaData(setPage);
                hideLoading();
            }
        } catch (error) {
            hideLoading();
            console.error('Error fetching data:', error);
        }
    };

    const addItem = async (item) => {
        const newItem =  await createUser(item);

        if (newItem.data.success) {
            showNotification("success", '', newItem.data.message);
            loadList();
            return true;
        } else {
            return false;
        }
    };

    const updateItem = async (updatedItem) => {
        const result = await updateUser(updatedItem);

        if (result.data.success) {
            showNotification("success", '', result.data.message);
            loadList();
            return true;
        } else {
            return false;
        }
    };


    useEffect(() => {
        loadList();
    }, [pagination]);

    const actionFromTable = (val) => SetPagination((prev) => ({ ...prev, current: val.current, pageSize: val.pageSize }));

    const deleteItem = async (id) => {
        const result = await deleteUser(id);
        if (result) {
            loadList();
            return true;
        } else {
            return false;
        }
    };

    return (
        <DataContext.Provider value={{
            items,
            metaData, 
            addItem: (item) => handleApiCall(() => createUser(item)), 
            updateItem: (item) => handleApiCall(() => updateUser(item)), 
            deleteItem: (id) => handleApiCall(() => deleteUser(id)), 
            actionFromTable}}>
            {children}
        </DataContext.Provider>
    )
};

export default UsersProvider;