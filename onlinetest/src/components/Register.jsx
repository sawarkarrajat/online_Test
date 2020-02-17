import React from "react";
import "../sass/Register.sass";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import * as data from "../data/..";
const fs = require('fs');


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name:'',
        email: '',
        password: '',
        repeatPassword: '',
    },
    };
  }
  
  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== this.state.user.password) {
            return false;
        }
        return true;
    });
  //   fs.readFileSync(data,(err, jsonString) => {
  //     if (err) {
  //         console.log("File read failed:", err)
  //         return
  //     }
  //     console.log('File data:', jsonString) 
  // })
}

componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule('isPasswordMatch');
}

handleChange = (event) => {
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({ user });
}

handleSubmit = () => {
    // your submit logic
}
  render() {
    const { user } = this.state;
    return ( 
        <div className="sbody ">
          <div id="regForm">
            {/* <div className="bg1"></div>
            <div className="bg2"></div> */}
          <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
              <TextValidator
                    label="Name"
                    onChange={this.handleChange}
                    fullWidth
                    name="name"
                    value={user.name}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    helperText="Enter first name and last name with a space"
                />
              <TextValidator
                    label="Email"
                    onChange={this.handleChange}
                    fullWidth
                    name="email"
                    value={user.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <TextValidator
                    label="Password"
                    onChange={this.handleChange}
                    fullWidth
                    name="password"
                    type="password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={user.password}
                />
                <TextValidator
                    label="Repeat password"
                    onChange={this.handleChange}
                    fullWidth
                    name="repeatPassword"
                    type="password"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'this field is required']}
                    value={user.repeatPassword}
                />
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </ValidatorForm>
          </div>
          <div id="sideText">
            <span>R</span>
            <span>E</span>
            <span>G</span>
            <span>I</span>
            <span>S</span>
            <span>T</span>
            <span>E</span>
            <span>R</span>
          </div>
        </div>
    );
  }
}

export default Register;
