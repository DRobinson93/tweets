import React from 'react';
import AlertMessage from './presontational/AlertMessage';
import SocialBtn from './presontational/SocialBtn';
import Comments from './Comments';
import axios from 'axios';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            alert: {},
            numOfLikes: props.likes_count,
            numOfComments: props.comments_count,
            authUserLiked: props.auth_user_like_id !== null,
            showCommentsDiv: false
        };
    }
    toggleLiked = () => {
        this.setState({authUserLiked : !this.state.authUserLiked});
    }
    setNumOfComments = (numOf) => {
        this.setState({numOfComments, numOf})
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
                    alert: {text:'Like added', type:'success'},
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
            <div className="form-inline align-items-center">
                <div className="row w-100">
                    <div className="col-6">
                        <h5 className="m-0">{this.props.user.name}</h5>
                        <small>@{this.props.user.name}</small>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-outline-primary rounded float-right">Follow</button>
                    </div>
                    <div className="col-12 mt-3 mb-1">
                        {this.props.value}
                    </div>
                    <div className="col-12">
                        {this.props.created_at}
                    </div>
                </div>
                <div className="row w-100">
                    <SocialBtn icon="retweet" text="100"/>
                    <SocialBtn icon="comment" text="100" onClick={this.toggleShowComments}/>
                    <SocialBtn onClick={this.handleLikeChange} text={this.state.numOfLikes}
                               icon="heart" highlight={this.state.authUserLiked}/>
                </div>
                <AlertMessage show="true" type={this.state.alert.type} text={this.state.alert.text}/>
                {commentsDiv}
            </div>
        );
    }
}

export default Post;
