import React from 'react';

function TweetsCard(props) {
    return (
        <div data-testid={props.testId} className="card my-0 w-100">
            <div className="m-2">
                {props.children}
            </div>
        </div>
    )
}

export default TweetsCard;
