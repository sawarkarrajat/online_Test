import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/Register";
import "./App.sass";
import ChromeReaderModeOutlinedIcon from '@material-ui/icons/ChromeReaderModeOutlined';
import { Icon } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <div className="Parent">
        <div className="header">
          <Icon fontSize="50px">
            <ChromeReaderModeOutlinedIcon/>
          </Icon>
          <h1>Online Test Application</h1>
        </div>
        <BrowserRouter>
          <Route path="/" exact component={Register}></Route>
          {/* <Route path="/dashboard/" component={}></Route> */}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
