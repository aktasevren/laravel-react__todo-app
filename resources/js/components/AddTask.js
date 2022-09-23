import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function AddTask({ addTask }) {
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);
  
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) {
        setError(true)
      }else{
        addTask(value);
        setValue("");
        setError(false);
      }
    };
  
    return (
      <Form onSubmit={handleSubmit}> 
        <Form.Group>
          <Form.Label><b>Add New Todo</b></Form.Label>
          <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="type something" />
        </Form.Group>
        { error &&  <p className="text-danger"> Please type something</p>}
        <div className="row">
          <div className="col text-center">
            <Button variant="warning mb-3 mt-3" type="submit">
              ADD TODO
            </Button>
          </div>
        </div>
        
      </Form>
    );
}

export default AddTask;