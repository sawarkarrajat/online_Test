import React from 'react';
import "../sass/Result.sass";
import { Button } from '@material-ui/core';
/**
 * 
 * @param {Object} props
 * @returns {HTMLElement} - returns a small html segment 
 */
function Result(props) {
  /**
   * @type {String}
   */
  let marks = localStorage.getItem('marks');
  /**
   * @type {Number}
   */
  let percentage = localStorage.getItem('percentage');
  /**
   * 
   * @param {Object} event - contains event fired on button click
   */
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