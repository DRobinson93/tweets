import React from 'react';
import AlertMessage from './presontational/AlertMessage';
import Comment from './Comment';
import axios from 'axios';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: {},
            comments: [],
            newComment: ""
        };
        this.getComments();
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
    handleChange = (event) => {
        this.setState({newComment: event.target.value});
    };
    handleSubmit = () => {
        this.setState({alert: {}});
        if(this.state.newComment === ""){
            return this.setState({
                alert: {text:'Comment can not be blank', type:'info'}
            });
        }
        axios.post('/comments/'+this.props.postId, {
            value: this.state.newComment
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
            <div className="card-body">
                {this.state.comments.map((comment, i) => {
                    return (<Comment key={i} {...comment} />)
                })}
                <div className="form-row col-12">
                    <label className="sr-only" htmlFor="addComment">Add a comment</label>
                    <input onChange={this.handleChange} value={this.state.newComment} className="form-control mb-2 col-11" id="addComment" placeholder="Add A Comment"/>
                    <button onClick={this.handleSubmit} type="button" className="btn btn-outline-primary mb-2 rounded col-1">Comment</button>
                </div>
                <AlertMessage show="true" type={this.state.alert.type} text={this.state.alert.text}/>
            </div>
        );
    }
}

export default Post;
