import React, { Component } from "react";
import "../sass/SignUp.sass";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
/**
 * @type {Object}
 */
const useStyles = makeStyles({
	root: {
		"& label.Mui-focused": {
			color: "black",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "black",
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "rgb(108, 241, 207)",
			},
			"&:hover fieldset": {
				borderColor: "black",
			},
			"&.Mui-focused fieldset": {
				borderColor: "rgb(108, 241, 209)",
			},
		},
	},
});
/**
 *
 * @param {Object} props
 * @returns {HTMLFormElement} -retruns an html form element
 */
export const RegistrationForm = (props) => {
	/**
	 * @type {Object}
	 */
	const classes = useStyles();
	return (
		<div className="formContainer">
			<ValidatorForm
				onSubmit={props.handleSubmit}
				onError={(errors) => console.log(errors)}
			>
				<h3 id="reg">Register</h3>
				{props.fields.map((data, index) => (
					<TextValidator
						classes={{
							root: classes.root,
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
/**
 * a class for signup page
 */
class SignUp extends Component {
	/**
	 *
	 * @param {Object} props user details
	 */
	constructor(props) {
		super(props);
		this.state = {
			user: {
				name: "",
				email: "",
				password: "",
				repeatPassword: "",
			},
		};
	}
	/**
	 * @property {Function} - does operation beore component mounts
	 */
	UNSAFE_componentWillMount() {
		localStorage.clear();
	}
	/**
	 * @property {Function} -  does operation after component mounts
	 */
	componentDidMount() {
		/**
		 * @property {Function} - adds validation rule to the dom
		 * @returns {boolean}
		 */
		ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
			if (value !== this.state.user.password) {
				return false;
			}
			return true;
		});
	}
	/**
	 * @property {Function} - does operation after component unmounts
	 */
	componentWillUnmount() {
		/**
		 * @property {Function}-remove rule when it is not needed
		 */
		ValidatorForm.removeValidationRule("isPasswordMatch");
	}
	/**
	 * @property {Function} - it is event used to input text
	 */
	handleChange = (event) => {
		/**
		 * @type {Object}
		 */
		const { user } = this.state;

		user[event.target.name] = event.target.value;
		this.setState({ user });
	};
	/**
	 * @property {Function} - it is used to submit form
	 */
	handleSubmit = async (event) => {
		event.preventDefault();
		/**
		 * @property {Function} - used to store data in localstorage
		 */
		await window.localStorage.setItem("userData", JSON.stringify(this.state));
		this.props.history.push("/disclaimer");
	};
	/**
	 * @property {Function} - used to render component in browser
	 */
  render() {
    /**
     * @type {object}
     */
    const { user } = this.state;
    /**
     * @type {JSON}
     */
		const fields = [
			{
				label: "Name",
				name: "name",
				value: user.name,
				type: "text",
				validators: ["required"],
				em: ["*this field is required"],
				helperText: "Enter first name and last name with a space",
			},
			{
				label: "Email",
				name: "email",
				value: user.email,
				type: "email",
				validators: ["required", "isEmail"],
				em: ["*this field is required", "*email is not valid"],
				helperText: "",
			},
			{
				label: "Password",
				name: "password",
				value: user.password,
				type: "password",
				validators: ["required", "matchRegexp:^(?=.{6,})"],
				em: [
					"*this field is required",
					"*password too short minimum 6 characters",
				],
				helperText: "",
			},
			{
				label: "Repeat password",
				name: "repeatPassword",
				value: user.repeatPassword,
				type: "password",
				validators: ["isPasswordMatch", "required"],
				em: ["*password mismatch", "*this field is required"],
				helperText: "",
			},
		];
		return (
			<div className="regForm">
				<RegistrationForm
					fields={fields}
					handleSubmit={(event) => this.handleSubmit(event)}
					handleChange={(event) => this.handleChange(event)}
				/>
			</div>
		);
	}
}

export default SignUp;
