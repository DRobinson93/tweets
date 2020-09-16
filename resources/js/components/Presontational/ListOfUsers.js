import React from 'react';
import Post from '../Post';
import TweetsCard from "./TweetsCard";
import UserInfo from "./UserInfo";
import ImgAndContent from "./ImgAndContent";

function ListOfUsers(props) {
    return (
        <div className="form-inline align-items-center">
            {props.users.map((user) => {
                // Return the element. Also pass key
                return (
                    <TweetsCard testId={"user"+user['id']} key={user['id']}>
                        <ImgAndContent imgUrl={user.avatar_public_url} imgClass="w-50">
                            <UserInfo date={user.created_at} user={user}/>
                        </ImgAndContent>
                    </TweetsCard>
                )
            })}
        </div>
    );
}

export default ListOfUsers;
