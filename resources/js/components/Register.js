import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import CenterContainer from "./Presontational/CenterContainer";
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function Register() {
    const { form, register, handleSubmit, errors, watch } = useForm();
    const [image, setImage] = useState({ preview: '', raw: '' });
    const [genError, setGenError] = useState('');
    const handleChange = (e) => {
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        })
    }
    const onSubmit = data => {
        const form_data = new FormData()
        for ( var key in data ) {
            form_data.append(key, data[key]);
        }
        form_data.append('avatar', image.raw)
        const config = {
            headers: {
                "Accept":"application/json",
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('/register', form_data, config)
            .then(function () {
               // window.location = '/';
            })
            .catch(function (error) {
                setGenError(error.response.data.message);
            });
    }
    const condReturnWarning = (err) => {
        return err ? 'border border-warning' : '';
    };

    return (
       <CenterContainer>
           <Card>
               <Card.Header>Register</Card.Header>
               <Card.Body>
                   <Form onSubmit={handleSubmit(onSubmit)}>
                       <Form.Group controlId="formBasicname" className={condReturnWarning(errors.name)}>
                           <Form.Label>Name</Form.Label>
                           <Form.Control type="text" name="name" placeholder="name" ref={register({required: true, maxLength: 80})}/>
                       </Form.Group>
                       <Form.Group controlId="formBasicuname" className={condReturnWarning(errors.username)}>
                           <Form.Label>UserName</Form.Label>
                           <Form.Control type="text" name="username" placeholder="username" ref={register({required: true, maxLength: 80})}/>
                       </Form.Group>
                       <Form.Group controlId="formBasicEmail" className={condReturnWarning(errors.email)}>
                           <Form.Label>Email address</Form.Label>
                           <Form.Control type="email" name="email" placeholder="email" ref={register({required: "Required"})}/>
                       </Form.Group>
                       <Form.Group controlId="formBasicpwd" className={condReturnWarning(errors.password)}>
                           <Form.Label>Password</Form.Label>
                           <Form.Control type="password" name="password" placeholder="password" ref={register({required: true, minLength: 6, maxLength: 20})}/>
                       </Form.Group>
                       <Form.Group controlId="formBasicpwdConf" className={condReturnWarning(errors.passwordConfirm)}>
                           <Form.Label>Password Confirm</Form.Label>
                           <Form.Control type="password" name="password_confirmation" placeholder="password Confirm"
                                         ref={register({validate: (value) => value === watch('password')})}/>
                       </Form.Group>
                       <Form.Group controlId="formBasicAvatar">
                           <Form.Label>Avatar</Form.Label>
                           <Form.Control type="file" name="avatar" placeholder="avatar" onChange={handleChange}/>
                           {image.preview && <img className="col-3" src={image.preview} />}
                       </Form.Group>
                       <input type="submit" />
                       {genError && <Alert variant="danger">{genError}</Alert>}
                   </Form>
               </Card.Body>
           </Card>
       </CenterContainer>
    );
}

export default Register;

if (document.getElementById('register')) {
    ReactDOM.render(<Register />, document.getElementById('register'));
}
