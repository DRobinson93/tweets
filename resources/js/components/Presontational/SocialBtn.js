import React from 'react';

const SocialBtn = (props) => {
    const highlight = props.highlight || false;
    let btnType = 'dark';
    if(highlight){
        btnType = 'success';
    }
    return (
        <div className={'col text-' + btnType} onClick={props.onClick}>
            <div className="cursor-pointer">
                <i className={'fa fa-'+props.icon}></i>
                {props.text}
            </div>
        </div>
    );
};

export default SocialBtn;
