import React from 'react';

const UserInfo = (props) => {
    return (
        <span>
            {props.user.first_name}
            <span className="text-muted pl-1">
                @{props.user.name}
                <span className="tiny">
                    <i className="fa fa-align-center mx-2"/>
                </span>
                {props.created_at}
            </span>
        </span>
    );
};

export default UserInfo;

