import React, { Component } from "react";
import "../sass/ConductTest.sass";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    borderRadius: "20px"
  },
  title: {
    color:"rgba(1, 122, 146, 0.75)",
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center"
  },
  content: {
    padding: "5px !important"
  }
});

const Timer = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography className={classes.title}>
          59:00
        </Typography>
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
          <div className="ques">b</div>
          <div className="actions">
            <Button id="prevnext" size="small">previous</Button>
            <Button id="prevnext" size="small">next</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConductTest;
