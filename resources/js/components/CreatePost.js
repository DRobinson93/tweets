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
        axios.post('/formSubmit', {
            name: this.state.name,
            description: this.state.description
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    render() {
        return (
            <div className="form-inline align-items-center">
                <div className="form-row col-12">
                    <label className="sr-only" htmlFor="inlineFormInput">Name</label>
                    <textarea onChange={this.handleChange} className="form-control mb-2 col-11" id="inlineFormInput" placeholder="What's going on?"/>
                    <button onClick={this.handleSubmit} type="button" className="btn btn-primary mb-2 rounded col-1">Tweet</button>
                </div>
                <AlertMessage show="true" type={this.state.alert.type} text={this.state.alert.text}/>
            </div>
        );
    }
}

export default CreatePost;
