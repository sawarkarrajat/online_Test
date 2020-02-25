import React from 'react';
import "../sass/Result.sass";
import { Button } from '@material-ui/core';

function Logout(props) {
  localStorage.clear();
  const handleRegister = (event) => {
    event.preventDefault();
    props.history.push("/");
  }
  
  return (
    <div className="result">
      <h1>you cannot go back to test please register again</h1>
      <Button varient="contained" size="medium" id="btn" onClick={handleRegister}>Register</Button>
    </div>
  );
}

export default Logout;