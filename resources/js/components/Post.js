import React from 'react';
import AlertMessage from './presontational/AlertMessage';
import axios from 'axios';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            alert: {}
        };
    }
    render() {
        return (
            <div className="form-inline align-items-center">
                <div className="row w-100">
                    <div className="col-6">
                        <h5 className="m-0">{this.props.user.name}</h5>
                        <small>@{this.props.user.name}</small>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-outline-primary rounded float-right">Follow</button>
                    </div>
                    <div className="col-12 mt-3 mb-1">
                        {this.props.value}
                    </div>
                    <div className="col-12">
                        {this.props.created_at}
                    </div>
                </div>
                <AlertMessage show="true" type={this.state.alert.type} text={this.state.alert.text}/>
            </div>
        );
    }
}

export default Post;
