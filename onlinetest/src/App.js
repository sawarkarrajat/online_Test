import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import Disclaimer from "./components/Disclaimer";
import ConductTest from './components/ConductTest';
import Result from "./components/Result";
import Logout from "./components/Logout";
import "./App.sass";

function App() {
 
  return (
    <div className="App">
      <div className="Parent">
        <div className="header">
          <h1>Test Application</h1>
        </div>
        <Router>
          <Switch>
            <Route path="/" exact component={SignUp}></Route>
            <Route path="/disclamer" component={Disclaimer}></Route>
            <Route path="/test" component={ConductTest}></Route>
            <Route path="/result" component={Result}></Route>
            <Route path="/logout" component={Logout}></Route>
            {/* <Route path="/dashboard/" component={}></Route> */}
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
