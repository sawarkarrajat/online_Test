import React, { Component } from "react";
import "../sass/ConductTest.sass";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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
  }
});

const RadioButtonsGroup = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("0");

  const handleChange = event => {
    console.log(event.target.value);
    setValue(event.target.value);
    // localStorage.setItem("level",event.target.value);
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
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            classes={{
              label: classes.legend
            }}
            value="0"
            control={<Radio color="primary" />}
            label="option 1"
          />
          <FormControlLabel
            classes={{
              label: classes.legend
            }}
            value="1"
            control={<Radio color="primary" />}
            label="option 2"
          />
          <FormControlLabel
            classes={{
              label: classes.legend
            }}
            value="2"
            control={<Radio color="primary" />}
            label="option 3"
          />
          <FormControlLabel
            classes={{
              label: classes.legend
            }}
            value="3"
            control={<Radio color="primary" />}
            label="option 4"
          />
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
};

const Timer = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography className={classes.title}>59:00</Typography>
      </CardContent>
    </Card>
  );
};

class ConductTest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="testContainer">
        <div className="navques">
          <Timer />
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
                Qno.&nbsp;{"["}1{"]"}&nbsp;&nbsp;
              </p>
              &nbsp;
              <p>what is 1+2</p>
            </div>
            <div className="options">
              <RadioButtonsGroup />
            </div>
          </div>
          <div className="actions">
            <Button id="prevnext" size="small">
              previous
            </Button>
            <Button id="prevnext" size="small">
              next
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConductTest;
