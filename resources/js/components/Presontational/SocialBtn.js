import React from 'react';

const SocialBtn = (props) => {
    const highlight = props.highlight || false;
    let btnType = 'dark';
    if(highlight){
        btnType = 'success';
    }
    return (
        <div className={'col text-' + btnType} onClick={props.onClick} data-testid={props.testId}>
            <div className={props.className + " cursor-pointer"}>
                <i className={'fa fa-'+props.icon}></i>
                <span data-testclass="text">{props.text}</span>
            </div>
        </div>
    );
};

SocialBtn.defaultProps = {
    className: ''
};

export default SocialBtn;

