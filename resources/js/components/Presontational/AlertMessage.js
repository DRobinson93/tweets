import React from 'react';
import Alert from "react-bootstrap/Alert";

const AlertMessage = props => {
    if(props.text === undefined){
        return false;
    }
    return (
        <Alert variant={props.type} fade="false" show={true}>
            <span data-testid={props.testId ?? ''}>{props.text}</span>
        </Alert>

    );
};
export default AlertMessage;
