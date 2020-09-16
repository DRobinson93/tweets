import React from 'react';
import AlertMessage from './presontational/AlertMessage';
import axios from 'axios';
import {testIds} from "./../test/common/testHelpers";
import {messages} from "./../common";
import InlineTxtAreaAndSubmitBtn from "./Presontational/InlineTxtAreaAndSubmitBtn";

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            alert: {}
        };
    }
    handleSubmit = (txtAreaVal) => {
        this.setState({alert: {}, value:txtAreaVal});
        if(txtAreaVal === ""){
            return this.setState({
                alert: {text:messages.newTweetForm.blank, type:'info'}
            });
        }
        axios.post('/posts', {
            value: txtAreaVal
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
            <div>
                <InlineTxtAreaAndSubmitBtn btnTxt="Tweet" testIds={testIds.addNewTweet} placeholder="What's going on?"
                                           handleSubmit={this.handleSubmit} value={this.state.value} />
                <AlertMessage testId={testIds.tweetFormAlert} show="true" type={this.state.alert.type} text={this.state.alert.text}/>
            </div>
        );
    }
}

export default CreatePost;
