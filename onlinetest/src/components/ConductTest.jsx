/**
 * @file ConductTest.jsx is the root file for this example app
 * @author Rajat Sawarkar
 */

import React, { Component } from "react";
import "../sass/ConductTest.sass";
import Button from "@material-ui/core/Button";
import data from "../data/questions.json";
import uniqid from "uniqid";
import Timer from "./Timer";
import ADialog from "./ADialog";
import { withRouter } from "react-router-dom";
/**
 * @type{Number}
 */
var index = 0;
/**
 * 
 * @param {Object} props 
 */
const Navigator = props => {
  return (
    <div className="navigator">
      {props.jsonData.map((d, pos) => (
        <div key={uniqid()} className="naviC">
          <div
            className={d.isAnswered ? "naviA" : "navi"}
            onClick={e => {
              props.handleNavigation(e, d.sno, pos);
            }}
          >
            {d.sno}
          </div>
        </div>
      ))}
    </div>
  );
};
/**
 * a class to create a conduct test page and its instances
 *
 * @class ConductTest
 * @extends {Component}
 */
class ConductTest extends Component {
  
  /**
   *Creates an instance of ConductTest.
   * @param {*} props
   * @memberof ConductTest
   */
  constructor(props) {
    super(props);
    this.state = {
      ...data[index],
      jsonData: data,
      dialog: false
    };
  }
  /**
   * @property{Function} - will go to logout if back is clicked
   * @memberof ConductTest
   */
  componentDidMount() {
    window.onpopstate = (e) => {
      e.preventDefault();
      this.setState({ dialog: true });
    };
  }
  /**
   * @property{Function} - handles previous and next
   * @param{Object} event - object to handle event
   * @param{String} step - type of step
   */
  handlePrevNext = (event, step) => {
    event.preventDefault();
    if (step === "prev" && index === 0) {
      return;
    } else if (step === "next" && index === data.length) {
      return;
    } else if (step === "prev") {
      index--;
      this.setState({ ...data[index] });
    } else if (step === "next") {
      index++;
      this.setState({ ...data[index] });
    }
  };
  /**
   * @property{Function} - handling navigation
   */
  handleNavigation = (event, sno, pos) => {
    event.preventDefault();
    index = pos;
    this.setState({
      ...data[sno - 1]
    });
  };
  /**
   * @property{Function} - handles option select
   */
  handleOptionSelect = (event, option) => {
    event.preventDefault();
    /**
     * @type{Object} state - holds state of selected and isanswered
     */
    this.setState(
      {
        selectedOption: option,
        isAnswered: true
      },
      () => {
        let stateData = this.state;
        data[index] = stateData;
        this.setState({
          jsonData: data
        });
      }
    );
  };
  /**
   * @property{Function} - handles agreement
   */
  handleAgree = () => {
    /**
     * @property{Object}
     */
    this.setState({ dialog: false });
    /**
     * @type{Number} marks - used to calculate marks
     */
    let marks = 0;
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].isAnswered &&
        data[i].correctAnswerIndex === data[i].selectedOption
      ) {
        marks += 1;
      }
    }
    /**
     * @type{Number} per - calculate percentage
     */
    let per = (marks / data.length) * 100;
    per = per.toString(); //If it's not already a String
    per = per.slice(0, per.indexOf(".") + 3); //With 3 exposing the hundredths place
    per = Number(per);
    localStorage.setItem("marks", marks);
    localStorage.setItem("percentage", per);
    this.props.history.push("/result");
  };
  /**
   * @property{Function} - method to handle submit 
   */
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      dialog: true
    });
  };
  render() {
    const {
      jsonData,
      question,
      sno,
      answerChoices,
      selectedOption,
      isAnswered
    } = this.state;
    return (
      <div className="testContainer">
        <div className="navques">
          <Timer />
          <Navigator
            jsonData={jsonData}
            isAnswered={isAnswered}
            handleNavigation={this.handleNavigation}
          />
        </div>
        <div className="areaques">
          <div className="submit">
            <div className="legend">
              <div className="navi">A</div>
              "Unattempted"
              <div className="naviA">A</div>
              "Attempted"
            </div>
            <Button
              id="stest"
              variant="contained"
              size="large"
              onClick={e => this.handleSubmit(e)}
            >
              Submit Test
            </Button>
          </div>
          <div className="ques">
            <div className="qtext">
              <p>
                Qno.&nbsp;{"["}
                {sno}
                {"]"}&nbsp;&nbsp;
              </p>
              &nbsp;
              <p>{question}</p>
            </div>
            <div className="options">
              <h3 id="txt">options:-</h3>
              {answerChoices.map((choices, posindex) => (
                <Button
                  size="large"
                  key={uniqid()}
                  id={selectedOption === posindex ? "sbtn" : "btn"}
                  varient="contained"
                  onClick={e => this.handleOptionSelect(e, posindex)}
                >
                  {choices}
                </Button>
              ))}
            </div>
          </div>
          <div className="actions">
            <Button
              id="prevnext"
              size="small"
              onClick={event => this.handlePrevNext(event, "prev")}
            >
              previous
            </Button>
            <Button
              id="prevnext"
              size="small"
              onClick={event => this.handlePrevNext(event, "next")}
            >
              next
            </Button>
          </div>
        </div>
        <ADialog
          status={this.state.dialog}
          handleClose={() => {
            this.setState({ dialog: false });
          }}
          handleAgree={this.handleAgree}
        />
      </div>
    );
  }
}

export default withRouter(ConductTest);
