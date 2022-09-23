import React from 'react';
import { Button } from 'react-bootstrap';

function SingleTask({ task, index, removeTask }) {
    return (
        <div key={index}>
            <div className="row">
                <div className="col-10">
                    {task.title}
                </div>
                <div className="col-2 text-right">
                    <Button variant="outline-danger" onClick={() => removeTask(index)}>
                        ✕
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SingleTask;