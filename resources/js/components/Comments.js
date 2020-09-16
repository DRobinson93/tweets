import React from 'react';
import AlertMessage from './presontational/AlertMessage';
import Comment from './Comment';
import axios from 'axios';
import InlineTxtAreaAndSubmitBtn from "./Presontational/InlineTxtAreaAndSubmitBtn";
import {getCommentsTestIds} from "../common";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: {},
            comments: [],
            newComment: ""
        };
        this.getComments();
        this.testIds = getCommentsTestIds(props.postId)
    }
    toggleLiked = () => {
        this.setState({authUserLiked : !this.state.authUserLiked});
    }
    getComments = () => {
        axios.get('/comments/'+this.props.postId)
            .then( (comments) => {
                this.setState({
                    comments: comments.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleSubmit = (textAreaVal) => {
        this.setState({alert: {}, newComment: textAreaVal});
        if(textAreaVal === ""){
            return this.setState({
                alert: {text:'Comment can not be blank', type:'info'}
            });
        }
        axios.post('/comments/'+this.props.postId, {
            value: textAreaVal
        })
            .then(response => {
                this.props.setParentNumberOfComments(this.state.comments.length);
                this.setState({
                    alert: {text:'Comment added', type:'success'},
                    newComment : '',
                    comments: this.state.comments.concat(response.data)
                });
            })
            .catch(error => {
                this.setState({
                    alert: {text:error, type:'danger'}
                });
            });
    };
    render() {
        return (
            <div>
                <InlineTxtAreaAndSubmitBtn btnTxt="Comment" testIds={this.testIds} placeholder="Add a comment"
                                           handleSubmit={this.handleSubmit} value={this.state.newComment} />
                {this.state.comments.map((comment, i) => {
                    return (<Comment key={i} {...comment} />)
                })}
                <AlertMessage show="true" type={this.state.alert.type} text={this.state.alert.text}/>
            </div>
        );
    }
}

export default Post;
