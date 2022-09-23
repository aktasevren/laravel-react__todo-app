import { Card } from "react-bootstrap";
import SingleTask from "./singleTask";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Records({ tasks }) {
    //////////////////////////////////////

    const dataList = tasks;

    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState(dataList);
    const excludeColumns = ["id", "user_id", "updated_at", "created_at"];

    const handleChange = (value) => {
        setSearchText(value);
        filterData(value);
    };

    const filterData = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") setData(dataList);
        else {
            const filteredData = dataList.filter((item) => {
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

    //////////////////////////////////////

    const [task, setTask] = useState([]);
    const [loadingGetTask, setLoadingGetTask] = useState(false);

    const getTask = async () => {
        setLoadingGetTask(true);
        return axios.get("/api/tasks").then((response) => {
            setTask(response.data);
            setLoadingGetTask(false);
        });
    };

    const removeTask = (index) => {
        setLoadingGetTask(true);
        axios
            .delete(`/api/tasks/${index}`)
            .then((response) => {
                getTask();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="App">
            Search Todo :
            <input
                style={{ marginLeft: 5 }}
                type="text"
                placeholder="Type to search..."
                value={searchText}
                onChange={(e) => handleChange(e.target.value)}
            />
            <div>
                {data.map((task, index) => (
                    <Card key={index}>
                        <Card.Body>
                            <SingleTask
                                key={index}
                                index={task.id}
                                task={task}
                                removeTask={removeTask}
                            />
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Records;
