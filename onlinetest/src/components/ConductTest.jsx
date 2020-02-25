import React, { Component } from "react";
import "../sass/ConductTest.sass";
// import { makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import data from "../data/questions.json";
import uniqid from "uniqid";
import Timer from "./Timer";
import ADialog from "./ADialog";
// const data = jdata;
var index = 0;

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

class ConductTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...data[index],
      jsonData: data,
      dialog: false
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("level")) {
      this.props.history.push("/logout");
    }
    window.onpopstate = e => {
      this.props.history.push("/logout");
    };
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

  handleNavigation = (event, sno, pos) => {
    event.preventDefault();
    index = pos;
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
        isAnswered: true
      },
      () => {
        let stateData = this.state;
        console.log("value in stateDAta", stateData);
        data[index] = stateData;
        this.setState({
          jsonData: data
        });
        console.log(this.state.jsonData);
        console.log(data.length);
      }
    );
  };

  handleAgree = () => {
    this.setState({ dialog: false });
    let marks = 0;
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].isAnswered && data[i].correctAnswerIndex === data[i].selectedOption)
      if (
        data[i].isAnswered &&
        data[i].correctAnswerIndex === data[i].selectedOption
      ) {
        marks += 1;
      }
    }
    // console.log("marks got", marks)
    let per = (marks / data.length) * 100;
    per = per.toString(); //If it's not already a String
    per = per.slice(0, per.indexOf(".") + 3); //With 3 exposing the hundredths place
    per = Number(per);
    // console.log("percentage got",per);
    localStorage.setItem("marks", marks);
    localStorage.setItem("percentage", per);
    this.props.history.push("/result");
  };

  handleSubmit = event => {
    event.preventDefault();
    // jdata = data;
    console.log("value in jdata", data);
    this.setState({
      dialog: true
    });
  };
  render() {
    // console.log(this.state);
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

export default ConductTest;
