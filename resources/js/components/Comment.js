import React from 'react';
import AlertMessage from './presontational/AlertMessage';
import axios from 'axios';

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
            <div className="card-body">
                {this.props.value}
                <AlertMessage show="true" type={this.state.alert.type} text={this.state.alert.text}/>
            </div>
        );
    }
}

export default Post;
