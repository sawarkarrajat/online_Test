import React, { Component } from "react";
import "../sass/SignUp.sass";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'violet',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'red',
      },
    },
  }
});

const RegistrationForm = props => {
  const classes = useStyles();
  return (
    <div className="formContainer">
      <ValidatorForm
        // ref="form"
        onSubmit={props.handleSubmit}
        onError={errors => console.log(errors)}
      >
        <h3 id="reg">Register</h3>
        {props.fields.map((data, index) => (
          <TextValidator
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
            }}
            variant="outlined"
            key={index + 121}
            label={data.label}
            onChange={props.handleChange}
            fullWidth
            name={data.name}
            value={data.value}
            type={data.type}
            validators={data.validators}
            errorMessages={data.em}
            helperText={data.helperText}
          />
        ))}

        <Button id="submit" variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </ValidatorForm>
    </div>
  );
};
class SignUp extends Component {
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
      if (
        value !== this.state.user.password &&
        this.state.user.password.length < 6
      ) {
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
    console.log("value is", event.target.value);

    user[event.target.name] = event.target.value;
    this.setState({ user }, () => {
      console.log("state is", this.state);
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log(JSON.stringify(this.state));

    await window.localStorage.setItem("userData", JSON.stringify(this.state));
    this.props.history.push("/disclamer");
  };
  render() {
    const { user } = this.state;
    const fields = [
      {
        label: "Name",
        name: "name",
        value: user.name,
        type: "text",
        validators: ["required"],
        em: ["this field is required"],
        helperText: "Enter first name and last name with a space"
      },
      {
        label: "Email",
        name: "email",
        value: user.email,
        type: "email",
        validators: ["required", "isEmail"],
        em: ["this field is required", "email is not valid"],
        helperText: ""
      },
      {
        label: "Password",
        name: "password",
        value: user.password,
        type: "password",
        validators: ["required"],
        em: ["this field is required"],
        helperText: ""
      },
      {
        label: "Repeat password",
        name: "repeatPassword",
        value: user.repeatPassword,
        type: "password",
        validators: ["isPasswordMatch", "required"],
        em: ["password mismatch", "this field is required"],
        helperText: ""
      }
    ];
    return (
      <div className="regForm">
        <RegistrationForm
          fields={fields}
          handleSubmit={event => this.handleSubmit(event)}
          handleChange={event => this.handleChange(event)}
        />
      </div>
    );
  }
}

export default SignUp;
