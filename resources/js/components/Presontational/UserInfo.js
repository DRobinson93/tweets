import React from 'react';

const UserInfo = (props) => {
    return (
        <span>
            {props.user.first_name}
            <span className="text-muted pl-1">
                <button type="button" className="btn btn-link p-0"
                        onClick={() => {window.location = '/users/'+props.user.username}}>
                     @{props.user.username}
                </button>
                <span className="tiny">
                    <i className="fa fa-align-center mx-2"/>
                </span>
                {props.date}
            </span>
        </span>
    );
};

export default UserInfo;

