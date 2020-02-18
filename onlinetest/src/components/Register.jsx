import React from "react";
import "../sass/Register.sass";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// import questions from "../data/questions.json";
const txt = ["R", "E", "G", "I", "S", "T", "E", "R"];

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
      }
    };
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.user.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleChange = event => {
    const { user } = this.state;
    console.log("value is",event.target.value);
    
    user[event.target.name] = event.target.value;
    this.setState({ user },()=>{
      console.log("state is",this.state);
      
    });
  };

  handleSubmit = (event) => {
   event.preventDefault();
   console.log(JSON.stringify(this.state));
   window.localStorage.setItem('userData',JSON.stringify(this.state));
  };
  render() {
    const { user } = this.state;
    const fields = [
      {
        label: "Name",
        name: "name",
        value: user.name,
        type:"text",
        validators: ["required"],
        em: ["this field is required"],
        helperText: "Enter first name and last name with a space"
      },
      {
        label: "Email",
        name: "email",
        value: user.email,
        type:"email",
        validators: ["required", "isEmail"],
        em: ["this field is required", "email is not valid"],
        helperText: ""
      },
      {
        label: "Password",
        name: "password",
        value: user.password,
        type:"password",
        validators: ["required"],
        em: ["this field is required"],
        helperText: ""
      },
      {
        label: "Repeat password",
        name: "repeatPassword",
        value: user.repeatPassword,
        type:"password",
        validators: ["isPasswordMatch", "required"],
        em: ["password mismatch", "this field is required"],
        helperText: ""
      }
    ];
    return (
      <div className="sbody ">
        <div id="regForm">
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            {fields.map((data,index) => (
              <TextValidator
                key={index+121}
                label={data.label}
                onChange={this.handleChange}
                fullWidth
                name={data.name}
                value={data.value}
                type={data.type}
                validators={data.validators}
                errorMessages={data.em}
                helperText={data.helperText}
              />
            ))}

            <Button
              id="submit"
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </ValidatorForm>
        </div>
        <div id="sideText">
          {txt.map((alpha,index) => (
            <span key={index}>{alpha}</span>
          ))}
        </div>
      </div>
    );
  }
}

export default Register;
