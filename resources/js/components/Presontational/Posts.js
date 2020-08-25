import React from 'react';
import Post from '../Post';
import FlashMessage from 'react-flash-message';

function Posts(props) {
    return (
        <div className="form-inline align-items-center">
            <FlashMessage duration={100000} persistOnHover={true}>
                <h5 className={"alert alert-danger"}>Error: test</h5>
            </FlashMessage>
            {props.posts.map((post, i) => {
                // Return the element. Also pass key
                return (
                    <div key={i} className="card my-2 w-100">
                        <div className="card-body">
                            <Post {...post}/>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Posts;
