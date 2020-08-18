import React from 'react';
import ReactDOM from 'react-dom';
import CreatePost from './CreatePost';
import Posts from './Presontational/Posts';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {posts: []};
    }
    addToPostArr = (post) =>{
        const posts = [post, ...this.state.posts];
        this.setState({posts: posts});
    };
    componentDidMount() {
        //get data
        axios.get('/posts/all')
            .then(response =>{
                console.log(response);
                this.setState({posts: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
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
