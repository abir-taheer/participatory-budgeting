import React from "react";
import {Switch, Route} from "react-router-dom";
import {AuthButton} from "./AuthButton";

export const Content = (props) => {

	return (
		<div>
			<Switch>
				<Route path={"/"} component={Hello} exact/>
			</Switch>
			<AuthButton/>
		</div>
	)
};

function Hello() {
	return <h1>Hello World!</h1>;
}
