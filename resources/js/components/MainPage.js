import React from 'react';
import CreatePost from './CreatePost';
import Posts from './Presontational/Posts';
import axios from 'axios';
import {addToPostArr} from "../common";
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {posts: []};
        this.addToPostArr = addToPostArr.bind(this);
    }
    getAndStorePosts = async () =>{
        let res = await axios.get('/posts/all');
        this.setState({posts: res.data});
    };
    componentDidMount() {
        this.getAndStorePosts().then();
    }
    render() {
        return (
            <div className="container">
                <CreatePost addToParentPostArr={this.addToPostArr}/>
                <Posts posts={this.state.posts}/>
            </div>
        );
    }
}

export default MainPage;
