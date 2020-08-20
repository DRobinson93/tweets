import React from 'react';
import AlertMessage from './presontational/AlertMessage';
import axios from 'axios';

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
                alert: {text:'Tweet can not be blank', type:'info'}
            });
        }
        axios.post('/posts', {
            value: this.state.value
        })
            .then(response => {
                this.props.addToParentPostArr(response.data);
                this.setState({
                    alert: {text:'Tweet added', type:'success'},
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
                    <label className="sr-only" htmlFor="inlineFormInput">New Tweet</label>
                    <textarea onChange={this.handleChange} className="form-control mb-2 col-11" id="inlineFormInput" placeholder="What's going on?"/>
                    <button onClick={this.handleSubmit} type="button" className="btn btn-primary mb-2 rounded col-1">Tweet</button>
                </div>
                <AlertMessage show="true" type={this.state.alert.type} text={this.state.alert.text}/>
            </div>
        );
    }
}

export default CreatePost;
