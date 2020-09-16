import React from 'react';
import Posts from './Presontational/Posts';
import ListOfUsers from './Presontational/ListOfUsers';
import axios from 'axios';
import CreatePost from "./CreatePost";
import {addToPostArr} from '../common';

const tabStates = ['posts', 'followers', 'following'];
class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            activeTab:tabStates[0],
            followers: [],
            following: [],
            userStats: {
                followers_count: 0,
                following_count: 0,
                posts_count: 0
            }
        };
    }
    setActiveTab = (activeTab) => {
        switch(activeTab) {
            case tabStates[1]:
                this.getAndStoreFollowers().then();
                break;
            case tabStates[2]:
                this.getAndStoreFollowing().then();
                break;
            default:
                this.getAndStoreLoadData().then();
                break;
        }
        this.setState({'activeTab' : activeTab});
    };

    getAndStoreLoadData = async () =>{
        let res = await axios.get('/users/posts/'+this.props.id);
        this.setState({posts: res.data});
        res = await axios.get('/users/'+this.props.id+'/stats');
        this.setState( {userStats: res.data});
    };

    getAndStoreFollowing = async () =>{
        let res = await axios.get('/following/'+this.props.id);
        this.setState({following: res.data});
    };

    getAndStoreFollowers = async () =>{
        let res = await axios.get('/followers/'+this.props.id);
        this.setState({followers: res.data});
    };

    getNavClasses = (index) =>{
        return 'nav-link ' + (tabStates[index] === this.state.activeTab ? 'active' : "");
    };

    addToPostArr = (post) =>{
        const posts = [post, ...this.state.posts];
        this.setState({posts: posts});
        let userStats = this.state.userStats;
        userStats['posts_count']++;
        this.setState({userStats: userStats});
    };

    componentDidMount() {
        this.getAndStoreLoadData().then();
    }
    render() {
        const userOnPersonalPg = this.props.userOnPersonalPage;
        const activeTab = this.state.activeTab;
        let tabHtml, createPostHtml;
        if (activeTab === 'posts') {
            if(userOnPersonalPg){
                createPostHtml = <CreatePost addToParentPostArr={this.addToPostArr}/>
            }
            tabHtml = <Posts posts={this.state.posts}/>;
        } else if(activeTab === 'followers'){
            tabHtml = <ListOfUsers users={this.state.followers} />;
        }else if(activeTab === 'following'){
            tabHtml = <ListOfUsers users={this.state.following} />;
        }
        return (
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-10">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className={this.getNavClasses(0)} href="#" onClick={() => this.setActiveTab(tabStates[0])}>
                                    Tweets <br/>
                                    {this.state.userStats.posts_count}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={this.getNavClasses(1)} href="#" onClick={() => this.setActiveTab(tabStates[1])}>
                                    Followers <br/>
                                    {this.state.userStats.followers_count}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={this.getNavClasses(2)} href="#" onClick={() => this.setActiveTab(tabStates[2])}>
                                    Following <br/>
                                    {this.state.userStats.following_count}
                                </a>
                            </li>
                        </ul>
                    </div>
                    {!userOnPersonalPg &&
                        <div className="col-2 nav nav-tabs justify-content-end">
                            <button className="btn btn-info">Follow</button>
                        </div>
                    }
                </div>
                {createPostHtml}
                {tabHtml}
            </div>
        );
    }
}

export default UserProfile;
