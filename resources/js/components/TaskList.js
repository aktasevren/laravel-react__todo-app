import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Card, Toast } from "react-bootstrap";
import SingleTask from "./singleTask";
import AddTask from "./AddTask";
import Records from "./Records";
import Pagination from "./Pagination";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [loadingAddTask, setLoadingAddTask] = useState(false);
    const [loadingGetTask, setLoadingGetTask] = useState(false);

    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1); // No of Records to be displayed on each page
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Records to be displayed on the current page
    const currentRecords = tasks.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(tasks.length / recordsPerPage);

    const getTask = () => {
        setLoadingGetTask(true);
        return axios.get("/api/tasks").then((response) => {
            setTasks(response.data);
            setLoadingGetTask(false);
        });
    };

    useEffect(() => {
        console.log(tasks)
        getTask();
    }, []);

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
                        <Records tasks={currentRecords} />
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
