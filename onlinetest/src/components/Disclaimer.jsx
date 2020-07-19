import React, { Component, Fragment } from "react";
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
import { withRouter } from "react-router-dom";

/**
 * @type{Object}
 */
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(3),
	},
	legend: {
		color: "white !important",
	},
}));
/**
 * @property {Function} - used to display radio button group
 * @returns {HTMLBodyElement}
 */
const RadioButtonsGroup = () => {
	let levelsAndMessage = [
		{
			Level: "L1",
			Message: "Easy questions",
		},
		{
			Level: "L2",
			Message: "Medium Difficulty questions",
		},
		{
			Level: "L3",
			Message: "Hard questions",
		},
	];
	/**
	 * @type{object}
	 */
	const classes = useStyles();
	/**
	 * @type{hook}
	 */
	const [value, setValue] = React.useState("L1");
	/**
	 *
	 * @param {Object} event - handles change of value for Level
	 */
	const handleChange = async (event) => {
		console.log(event.target.value);
		setValue(event.target.value);
		await localStorage.setItem("level", event.target.value);
	};

	return (
		<React.Fragment>
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
					{levelsAndMessage.map((item) => (
						<Fragment>
              <FormControlLabel
                key={item.Level}
								className={classes.legend}
								value={item.Level}
								control={<Radio color="primary" />}
								label={item.Level}
							/>
              <FormHelperText key={item.Message}>{item.Message}</FormHelperText>
						</Fragment>
					))}
				</RadioGroup>
			</FormControl>
		</React.Fragment>
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

class Disclaimer extends Component {
	componentDidMount() {
		localStorage.setItem("level", "L1");
	}
	handleStart = (event) => {
		event.preventDefault();
		if (!localStorage.getItem("userData")) {
			return;
		}
		this.props.history.push("/test");
	};
	render() {
		return (
			<div className="disclaimer">
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

export default withRouter(Disclaimer);
