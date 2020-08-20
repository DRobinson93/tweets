import React from 'react';

const SocialBtn = (props) => {
    const highlight = props.highlight || false;
    let btnType = 'dark';
    if(highlight){
        btnType = 'success';
    }
    return (
        <div className="col" onClick={props.onClick}>
            <i className={'fa fa-'+props.icon}></i>
            {props.text}
        </div>
    );
};

export default SocialBtn;
