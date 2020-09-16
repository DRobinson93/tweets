import React from 'react';

function ImgAndContent(props) {
    const imgClass = props.imgClass || 'w-100';
    return (
        <div className="row no-gutters">
            <div className="col-2 col-md-1 px-2">
                <img src={props.imgUrl} alt="avatar"
                     className={'img-thumbnail rounded-circle float-right mr-2 ' + imgClass}/>
            </div>
            <div className="col-10 col-md-11">
                {props.children}
            </div>
        </div>
    )
}

export default ImgAndContent;
