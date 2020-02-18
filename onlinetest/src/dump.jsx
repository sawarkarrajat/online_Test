// // #49e5ff
// // #6a5edf
// // #000000
// // "template": "./custom-template",
// //     "tutorials": "./tutorials",
// //     "readme": "./readme/readme.md"

// // {questions.map((data,index)=>{

// //   return <h4 key={data.sno}>{data.question}</h4>
// // })}

// <TextValidator
//               label="Email"
//               onChange={this.handleChange}
//               fullWidth
//               name="email"
//               value={user.email}
//               validators={["required", "isEmail"]}
//               errorMessages={["this field is required", "email is not valid"]}
//             />
//             <TextValidator
//               label="Password"
//               onChange={this.handleChange}
//               fullWidth
//               name="password"
//               type="password"
//               validators={["required"]}
//               errorMessages={["this field is required"]}
//               value={user.password}
//             />
//             <TextValidator
//               label="Repeat password"
//               onChange={this.handleChange}
//               fullWidth
//               name="repeatPassword"
//               type="password"
//               validators={["isPasswordMatch", "required"]}
//               errorMessages={["password mismatch", "this field is required"]}
//               value={user.repeatPassword}
//             />