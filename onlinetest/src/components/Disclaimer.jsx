import React, { Component } from "react";
import "../sass/Disclaimer.sass";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  },
  legend: {
    color: "white !important"
  }
}));

const RadioButtonsGroup = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("L1");

  const handleChange = event => {
    console.log(event.target.value);
    setValue(event.target.value);
    localStorage.setItem("level", event.target.value);
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel
          component="legend"
          className={classes.legend}
          style={{ fontStyle: "italic" }}
        >
          Levels
        </FormLabel>
        <RadioGroup
          aria-label="levels"
          name="levels"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            className={classes.legend}
            value="L1"
            control={<Radio />}
            label="L1"
          />
          <FormHelperText>Easy questions</FormHelperText>
          <FormControlLabel
            className={classes.legend}
            value="L2"
            control={<Radio />}
            label="L2"
          />
          <FormHelperText>Medium Difficulty questions</FormHelperText>
          <FormControlLabel
            className={classes.legend}
            value="L3"
            control={<Radio />}
            label="L3"
          />
          <FormHelperText>Hard questions</FormHelperText>
        </RadioGroup>
      </FormControl>
    </div>
  );
};

const Lorem = () => {
  return (
    <div className="lorem">
      <Typography component="p">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur.
      </Typography>
    </div>
  );
};

class Disclamer extends Component {
  componentDidMount() {
    window.onpopstate = e => {
      this.props.history.push("/logout");
    };
  }
  handleStart = event => {
    event.preventDefault();
    this.props.history.push("/test");
  };
  render() {
    return (
      <div className="disclamer">
        <Typography component="h4" variant="h4">
          Disclaimer
        </Typography>
        <Lorem />
        <div className="level">
          <h4>Please select the level of test.</h4>
          <RadioButtonsGroup />
        </div>
        <div className="next">
          <Button
            variant="contained"
            size="small"
            id="next"
            onClick={this.handleStart}
          >
            Start Test
          </Button>
        </div>
      </div>
    );
  }
}

export default Disclamer;
