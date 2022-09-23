import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Toast } from "react-bootstrap";
import AddTask from "./AddTask";
import Pagination from "./Pagination";

function TaskList() {

    const [tasks, setTasks] = useState([]);
    const [data, setData] = useState([]);
    const [updateData, setupdateData] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [loadingAddTask, setLoadingAddTask] = useState(false);
    const [loadingGetTask, setLoadingGetTask] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = tasks.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(tasks.length / recordsPerPage);
    const excludeColumns = ["id", "user_id", "updated_at", "created_at"];


    useEffect(() => {
        getTask();
    }, []);

    const handleChange = (value) => {
        setSearchText(value);
        filterData(value);
    };

    const updateChange = (value) => {
        setupdateData(value)
    };
    const filterData = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") setData(tasks);
        else {
            const filteredData = tasks.filter((item) => {
                return Object.keys(item).some((key) =>
                    excludeColumns.includes(key)
                        ? false
                        : item[key]
                            .toString()
                            .toLowerCase()
                            .includes(lowercasedValue)
                );
            });
            setData(filteredData);
        }
    };
    const getTask = async () => {
        setLoadingGetTask(true);
        return await axios.get("/api/tasks").then((response) => {
            setTasks(response.data);
            setData(response.data)
            setLoadingGetTask(false);
        });
    };

    const removeTask = async (index) => {
        setLoadingGetTask(true);
        await axios
            .delete(`/api/tasks/${index}`)
            .then((response) => {
                getTask()
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateTask = async (index) => {
        setLoadingGetTask(true);
        await axios
            .put(`/api/tasks/${index}`, { title: updateData })
            .then((response) => {
                getTask()
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const addTask = (text) => {
        setLoadingAddTask(true);
        axios
            .post("/api/tasks", { title: text })
            .then((response) => {
                setShowToast(true);
                setLoadingAddTask(false);
                getTask();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="app">
            <div className="container">
                <h1 className="text-center mb-4">Todo List</h1>
                {loadingAddTask ? (
                    <p>Adding the task...Please Wait !</p>
                ) : (
                    <AddTask addTask={addTask} />
                )}
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={2000}
                    autohide
                    bg="info"
                >
                    <Toast.Body>New Task Added!</Toast.Body>
                </Toast>
                {loadingGetTask ? (
                    <p>Loading...Please Wait !</p>
                ) : (
                    <div>
                        <div><h5>Search Todo :</h5></div>

                        <input
                            className="mt-2 mb-3"
                            type="text"
                            placeholder="Type to search..."
                            value={searchText}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        <div>
                            {data.map((task, index) => (
                                <div key={index}>
                                    <div class="input-group my-2">
                                        <textarea onChange={(e) => updateChange(e.target.value)} type="text" class="form-control">{task.title}</textarea>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-dark" onClick={() => updateTask(task.id)} type="button">Update</button>
                                        </div>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-danger" onClick={() => removeTask(task.id)} type="button">Delete</button>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            nPages={nPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                )}
            </div>
        </div>






    );
}

export default TaskList;

if (document.getElementById("tasklist")) {
    ReactDOM.render(<TaskList />, document.getElementById("tasklist"));
}
