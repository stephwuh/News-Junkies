import React from 'react';

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const NewsList = (props) =>{

    
    return(
        <Col className={props.type}>
          <h3>{props.type}</h3>
          {props.list &&
            props.list.map((source, index) => {
              return (
                <div key={index}>
                    
                    <Form.Check
                        type="checkbox" 
                        label={source.source}
                        onChange={props.onChange}
                        value={source.source}
                    />

                </div>
              );
            })}
        </Col>
    );
};

export default NewsList;