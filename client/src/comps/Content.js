import React from "react";
import {Switch, Route} from "react-router-dom";
import {AuthButton} from "./AuthButton";
import {Options} from "../pages/Options";

export const Content = (props) => {

	return (
		<div>
			<Switch>
				<Route path={"/"} component={Options} exact/>
			</Switch>
		</div>
	)
};
