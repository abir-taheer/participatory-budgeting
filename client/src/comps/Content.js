import React from "react";
import {Switch, Route} from "react-router-dom";
import {Options} from "../pages/Options";
import {Vote} from "../pages/Vote";

export const Content = (props) => {

	return (
		<div>
			<Switch>
				<Route path={"/"} component={Options} exact/>
				<Route path={"/vote"} component={Vote} exact/>
			</Switch>
		</div>
	)
};
