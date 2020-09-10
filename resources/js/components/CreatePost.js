import React from 'react';
import AlertMessage from './presontational/AlertMessage';
import axios from 'axios';
import {testIds} from "./../test/common/testHelpers";
import {messages} from "./../common";

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            alert: {}
        };
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    };
    handleSubmit = () => {
        this.setState({alert: {}});
        if(this.state.value === ""){
            return this.setState({
                alert: {text:messages.newTweetForm.blank, type:'info'}
            });
        }
        axios.post('/posts', {
            value: this.state.value
        })
            .then(response => {
                this.props.addToParentPostArr(response.data);
                this.setState({
                    alert: {text:messages.newTweetForm.success, type:'success'},
                    value : ''
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
            <div className="form-inline align-items-center">
                <div className="form-row col-12">
                    <label className="sr-only">New Tweet
                        <textarea onChange={this.handleChange} className="form-control mb-2 col-11"
                                  data-testid={testIds.addNewTweet.input} placeholder="What's going on?"/>
                    </label>
                    <button onClick={this.handleSubmit} type="button" className="btn btn-primary mb-2 rounded col-1"
                            data-testid={testIds.addNewTweet.btn}>Tweet</button>
                </div>
                <AlertMessage testId={testIds.tweetFormError} show="true" type={this.state.alert.type} text={this.state.alert.text}/>
            </div>
        );
    }
}

export default CreatePost;
