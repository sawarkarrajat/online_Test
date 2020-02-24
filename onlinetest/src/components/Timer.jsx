import React, { Component } from "react";
import "../sass/ConductTest.sass";
import Card from "@material-ui/core/Card";
import { makeStyles} from "@material-ui/core/styles";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
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
  content: {
    padding: "5px !important"
  }
});

const DisplayTimer = (props) => {
  const classes = useStyles();
  return (
    <Card
        classes={{
          root: classes.root
        }}
      >
        <CardContent
          classes={{
            root: classes.content
          }}
        >
          <Typography classes={{ root: classes.title }}>
            {props.mns} : {props.snds}
          </Typography>
        </CardContent>
      </Card>
  )
}

class Timer extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 3600000
  };
  componentDidMount() {
    this.startTimer();
  }
  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert("Countdown ended");
      }
    }, 10);
  };

  render() {
    const { timerTime } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    // let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <DisplayTimer snds = { seconds} mns ={minutes}/>
    );
  }
}
export default Timer;
