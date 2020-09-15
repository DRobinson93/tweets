import React from 'react';
import TweetsCard from "./Presontational/TweetsCard";
import UserInfo from "./Presontational/UserInfo";

class Post extends React.Component {
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
                <UserInfo user={this.props.user}/>
                <br/>
                {this.props.value}
            </TweetsCard>
        );
    }
}

export default Post;
