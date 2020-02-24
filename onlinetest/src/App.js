import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import Disclaimer from "./components/Disclaimer";
import ConductTest from './components/ConductTest';
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
            {/* <Route path="/" exact component={Register}></Route> */}
            <Route path="/disclamer" component={Disclaimer}></Route>
            <Route path="/test" component={ConductTest}></Route>
            {/* <Route path="/dashboard/" component={}></Route> */}
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
