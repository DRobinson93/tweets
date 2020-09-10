import React from 'react';
import ReactDOM from 'react-dom';
import CreatePost from './CreatePost';
import Posts from './Presontational/Posts';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {posts: []};
    }
    addToPostArr = (post) =>{
        const posts = [post, ...this.state.posts];
        this.setState({posts: posts});
    };
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

export default Home;

if (document.getElementById('Home')) {
    ReactDOM.render(<Home />, document.getElementById('Home'));
}
