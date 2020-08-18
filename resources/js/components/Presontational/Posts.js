import React from 'react';
import Post from '../Post';

function Posts(props) {
    return (
        <div className="form-inline align-items-center">
            {props.posts.map((post, i) => {
                // Return the element. Also pass key
                return (
                    <div className="card my-2">
                        <div className="card-body">
                            <Post key={i} {...post}/>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Posts;
