import React, { Component } from "react";
import "../sass/ConductTest.sass";
// import { makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import jdata from "../data/questions.json";
import uniqid from "uniqid";
import Timer from "./Timer";
const data = jdata;
var index = 0;
// const element = [];
// for (let i = 0; i < data.length; i++) {
//   element.push(data[i].sno)
// }

const Navigator = props => {
  return (
    <div className="navigator">
      {/* {props.jsonData.map(d => (
        <div className="naviC">
          <div className={}>{d.sno}</div>
        </div>
      ))} */}
    </div>
  );
};

class ConductTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...data[index],
      jsonData: data
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("level")) {
      this.props.history.push("/logout");
    }
  }

  handlePrevNext = (event, step) => {
    event.preventDefault();
    console.log(step);
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

  handleNavigation = (event, sno) => {
    event.preventDefault();
    this.setState({
      ...data[sno - 1]
    });
  };

  handleOptionSelect = (event, option) => {
    event.preventDefault();
    console.log(option);
    this.setState(
      {
        selectedOption: option,
        isAnswered: true,
        isVisited: true
      },
      () => {
        let stateData = this.state;
        data[index] = {
          ...data[index],
          stateData
        };
        
        console.log(this.state);
        console.log(data);
      }
    );
  };

  render() {
    // console.log(this.state);
    const {
      jsonData,
      question,
      sno,
      answerChoices,
      // correctAnswerIndex,
      selectedOption,
      isAnswered,
      isVisited
    } = this.state;
    return (
      <div className="testContainer">
        <div className="navques">
          <Timer />
          <Navigator
            jsonData={jsonData}
            isAnswered={isAnswered}
            isVisited={isVisited}
            handleNavigation={this.handleNavigation}
          />
        </div>
        <div className="areaques">
          <div className="submit">
            <Button id="stest" variant="contained" size="large">
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
      </div>
    );
  }
}

export default ConductTest;
