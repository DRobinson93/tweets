import React from 'react';
import TweetsCard from "./Presontational/TweetsCard";
import UserInfo from "./Presontational/UserInfo";
import ImgAndContent from "./Presontational/ImgAndContent";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: {},
            comments: [],
            newComment: ""
        };
    }
    toggleLiked = () => {
        this.setState({authUserLiked : !this.state.authUserLiked});
    }
    render() {
        return (
            <TweetsCard>
                <ImgAndContent imgUrl={this.props.user.avatar_public_url}>
                    <UserInfo date={this.props.created_at} user={this.props.user}/>
                    <br/>
                    {this.props.value}
                </ImgAndContent>
            </TweetsCard>
        );
    }
}

export default Comment;
