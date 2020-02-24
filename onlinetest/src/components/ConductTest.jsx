import React, { Component } from "react";
import "../sass/ConductTest.sass";
import { makeStyles} from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
import { Button, Step } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import jdata from "../data/questions.json";
import uniqid from "uniqid";
import Timer from "./Timer";
const data = jdata;
var index = 0;


const useStyles = makeStyles({
  root: {
    width: "100%",
    borderRadius: "20px"
  },
  title: {
    color: "rgba(1, 122, 146, 0.75)",
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center"
  },
  group: {
    justifyContent: "space-between"
  },
  content: {
    padding: "5px !important"
  },
  formControl: {
    width: "100%",
    margin: "24px"
  },
  legend: {
    color: "white !important",
    fontFamily: "'Fredoka One', cursive !important"
  },
  checked: {
    color: "rgb(1, 122, 145) !important"
  }
});

const RadioButtonsGroup = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState("x");

  const handleChange = event => {
    console.log(event.target.value);
    setValue(Number(event.target.value));
  };

  return (
    <React.Fragment>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel
          component="legend"
          className={classes.legend}
          style={{ fontStyle: "italic", fontSize: "12px" }}
        >
          options:
        </FormLabel>
        <RadioGroup
          aria-label="options"
          classes={{
            root: classes.group
          }}
          name="options"
          value={Number(value)}
          onChange={handleChange}
        >
          {props.options.map((choice, index) => (
            <FormControlLabel
              key={uniqid()}
              classes={{
                label: classes.legend
              }}
              value={index}
              control={
                <Radio
                  classes={{
                    checked: classes.checked
                  }}
                  color="primary"
                />
              }
              label={choice}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
};

// const Timer = () => {
//   const classes = useStyles();

//   return (
// <Card className={classes.root}>
//   <CardContent className={classes.content}>
//     <Typography className={classes.title}>59:00</Typography>
//   </CardContent>
// </Card>
//   );
// };
const Navigator = props => {
  return (
    <div className="navigator">
      {data.map(info => (
        <div key={uniqid()} className="naviC">
          <div
            className="navi"
            onClick={event => props.handleNavigation(event, info.sno)}
          >
            {info.sno}
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
      ...data[index]
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

  render() {
    console.log(this.state);
    const {
      question,
      sno,
      answerChoices,
      correctAnswerIndex,
      isAnswered,
      isVisited
    } = this.state;
    return (
      <div className="testContainer">
        <div className="navques">
          <Timer />
          <Navigator handleNavigation={this.handleNavigation} />
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
              <RadioButtonsGroup
                options={answerChoices}
                correctAns={correctAnswerIndex}
              />
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
