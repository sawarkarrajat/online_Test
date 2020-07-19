import React from 'react';
import { shallow } from 'enzyme';

import SignUp,{RegistrationForm} from '../SignUp';

describe('SignUp tests', () => {

  it('renders SignUP', () => {
    const wrapper = shallow(<SignUp />);
    // Expect the wrapper object to be defined
    expect(wrapper.find('.regForm')).toBeDefined();
  });

  it('renders a list item', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper.find('#reg')).toBeDefined();
  });

  it('renders a registration form', () => {
   
    const fields = [
			{
				label: "Name",
				name: "name",
				value: "",
				type: "text",
				validators: ["required"],
				em: ["*this field is required"],
				helperText: "Enter first name and last name with a space",
			},
			{
				label: "Email",
				name: "email",
				value: "",
				type: "email",
				validators: ["required", "isEmail"],
				em: ["*this field is required", "*email is not valid"],
				helperText: "",
			},
			{
				label: "Password",
				name: "password",
				value: "",
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
				value: "",
				type: "password",
				validators: ["isPasswordMatch", "required"],
				em: ["*password mismatch", "*this field is required"],
				helperText: "",
			},
    ];
    const wrapper = shallow(<RegistrationForm fields={fields} />);
    
    expect(wrapper.containsAnyMatchingElements([<h3 id="reg">Register</h3>])).to.equal(true);
  });

  // it('renders correct text in item', () => {
  //   const items = ['John', 'James', 'Luke'];
  //   const wrapper = shallow(<List items={items} />);

  //   //Expect the child of the first item to be an array
  //   expect(wrapper.find('.item').get(0).props.children).toEqual('John');
  // });
});