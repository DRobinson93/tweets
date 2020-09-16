import React from 'react';
import AlertMessage from './presontational/AlertMessage';
import SocialBtn from './presontational/SocialBtn';
import UserInfo from './Presontational/UserInfo';
import Comments from './Comments';
import axios from 'axios';
import ImgAndContent from "./Presontational/ImgAndContent";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            alert: {},
            numOfLikes: props.likes_count,
            numOfComments: props.comments_count,
            numOfRetweets: props.retweets_count,
            authUserLiked: props.auth_user_like_id !== null,
            showCommentsDiv: false
        };
    }

    toggleLiked = () => {
        this.setState({authUserLiked : !this.state.authUserLiked});
    }
    setNumOfComments = (numOf) => {
        this.setState({numOfComments: numOf})
    }
    unlike = () => {
        axios.delete('/postLikes/'+this.props.auth_user_like_id)
            .then((response) =>{
                this.setState({
                    alert: {text:'Like removed', type:'success'},
                    numOfLikes: this.state.numOfLikes - 1
                });
                this.toggleLiked();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    like = () => {
        axios.post('/postLikes/'+this.props.id)
            .then( (response) => {
                this.setState({
                    numOfLikes: this.state.numOfLikes + 1,
                    auth_user_like_id: response.id
                });
                this.toggleLiked();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    toggleShowComments = () =>{
        this.setState({showCommentsDiv: !this.state.showCommentsDiv})
    }
    handleLikeChange = () =>{
        const liked = this.state.authUserLiked;
        const requestsUrl = '/postLikes/'+this.props.auth_user_like_id;
        if(liked){ //unlike
            this.unlike();
        }
        else{ //like
            this.like();
        }
    };
    render() {
        let commentsDiv;
        if (this.state.showCommentsDiv) {
            commentsDiv = <Comments setParentNumberOfComments={this.setNumOfComments} postId={this.props.id} />;
        } else {
            commentsDiv = "";
        }
        return (
            <ImgAndContent imgUrl={this.props.user.avatar_public_url}>
                <h5 className="m-0">
                    <UserInfo date={this.props.created_at} user={this.props.user}/>
                </h5>
                <div className="my-1">
                    {this.props.value}
                </div>
                <div className="row no-gutters w-100">
                    <SocialBtn testId={"post"+this.props.id+"retweetbtn"} icon="retweet" text={this.state.numOfRetweets}/>
                    <SocialBtn testId={"post"+this.props.id+"commentbtn"} icon="comment"
                               className="text-center"
                               text={this.state.numOfComments} onClick={this.toggleShowComments}/>
                    <SocialBtn testId={"post"+this.props.id+"likebtn"} className="pull-right"
                               onClick={this.handleLikeChange} text={this.state.numOfLikes}
                               icon="heart" highlight={this.state.authUserLiked}/>
                </div>
                <AlertMessage show="true" type={this.state.alert.type} text={this.state.alert.text}/>
                {commentsDiv}
            </ImgAndContent>
        );
    }
}

// Specifies the default values for props:
Post.defaultProps = {
    comments_count: 0, likes_count:0, retweets_count:0
};

export default Post;
