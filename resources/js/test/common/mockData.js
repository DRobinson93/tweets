export const postData = {
    "id":1,"user_id":1,"value":'New post',
    "created_at":"2020-08-30 21:00",
    "updated_at":"2020-08-30T21:42:06.000000Z",
    "likes_count":1,"comments_count":1,"auth_user_like_id":1,
    "user":
        {"id":1,"name":"Admin User","email":"danpaulrob1@gmail.com",
            "email_verified_at":null,"created_at":null,
            "updated_at":null,"avatar":"user.jpg",
            "username":"",
            "avatar_public_url":"http://tweets.test/user.jpg"
        }
};

export const newPostData = {
    "id":4,"user_id":1,"value":"ff",
    "created_at":"2020-09-10 15:00",
    "updated_at":"2020-09-10T15:56:42.000000Z",
    "auth_user_like_id":null,
    "user":
        {
            "id":1,"name":"Admin User","email":"danpaulrob1@gmail.com",
            "email_verified_at":null,"created_at":null,"updated_at":null,
            "avatar":"user.jpg","username":"",
            "avatar_public_url":"http:\/\/tweets.test\/user.jpg"
        }
};

export const postsData = [postData];

export const commentData = [
    {
        "id":1,"value":"sdvsdv","user_id":1,
        "post_id":1,"created_at":"2020-09-09T00:15:45.000000Z",
        "updated_at":"2020-09-09T00:15:45.000000Z"
    }
];

export const newCommentData =
    {
        "id":2,"value":"new comment test","user_id":1,
        "post_id":1,"created_at":"2020-09-09T00:15:45.000000Z",
        "updated_at":"2020-09-09T00:15:45.000000Z"
    }
