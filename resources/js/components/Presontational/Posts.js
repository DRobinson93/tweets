import React from 'react';
import Post from '../Post';
import TweetsCard from "./TweetsCard";

function Posts(props) {
    return (
        <div className="form-inline align-items-center">
            {props.posts.map((post) => {
                // Return the element. Also pass key
                return (
                    <TweetsCard testId={"post"+post['id']} key={post['id']}>
                        <Post {...post}/>
                    </TweetsCard>
                )
            })}
        </div>
    );
}

export default Posts;
