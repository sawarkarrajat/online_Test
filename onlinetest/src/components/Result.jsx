import React from 'react';
import "../sass/Result.sass";
import { Button } from '@material-ui/core';

function Result(props) {
  let marks = localStorage.getItem('marks');
  let percentage = localStorage.getItem('percentage');
 
  const handleExit = (event) => {
    event.preventDefault();
    props.history.push("/")
  }
  return (
    <div className="result">
      <h1>you got {marks} marks &</h1>
      <h1>your percentage is {percentage}%</h1>
      <Button varient="contained" size="medium" id="btn" onClick={handleExit}>Exit</Button>
    </div>
  );
}

export default Result;