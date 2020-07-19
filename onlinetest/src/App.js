import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
// import { browserHistory } from 'react-router';
import SignUp from "./components/SignUp";
import Disclaimer from "./components/Disclaimer";
import ConductTest from "./components/ConductTest";
import Result from "./components/Result";
import Logout from "./components/Logout";
import "./App.sass";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

function App() {
	return (
		<Router history={customHistory}>
			<div className="App">
				<div className="Parent">
					<div className="header">
						<h1>Test Application</h1>
					</div>
          <Switch>
            <Redirect from="/" exact to="/Signup" />
						<Route path="/Signup" component={SignUp}></Route>
						<Route
							path="/disclaimer"
							strict
							render={() =>
								localStorage.getItem("userData") ? (
									<Disclaimer/>
								) : (
									<Redirect to="/" />
								)
							}
						></Route>
						<Route
							path="/test"
							strict
							render={() =>
								localStorage.getItem("userData") ? (
									<ConductTest/>
								) : (
									<Redirect to="/" />
								)
							}
						></Route>
						<Route
							path="/result"
							strict
							render={() =>
								localStorage.getItem("userData") ? (
									<Result />
								) : (
									<Redirect to="/" />
								)
							}
						></Route>
						<Route path="/logout" component={Logout}></Route >
						<Redirect  path="*" to="/"></Redirect >
						{/* <Route path="/dashboard/" component={}></Route> */}
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
