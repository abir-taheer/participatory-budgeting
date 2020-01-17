import React from "react";
import {Switch, Route} from "react-router-dom";
import {Options} from "../pages/Options";
import {Vote} from "../pages/Vote";
import {Results} from "../pages/Results";

export const Content = (props) => {

	return (
		<div>
			<Switch>
				<Route path={"/"} component={Options} exact/>
				<Route path={"/vote"} component={Vote} exact/>
				<Route path={"/results"} component={Results} exact/>
			</Switch>
		</div>
	)
};
