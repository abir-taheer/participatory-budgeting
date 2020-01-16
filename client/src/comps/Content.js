import React from "react";
import {Switch, Route} from "react-router-dom";

export const Content = (props) => {

	return (
		<div>
			<Switch>
				<Route path={"/"} component={Hello} exact/>
			</Switch>
		</div>
	)
};

function Hello() {
	return <h1>Hello World!</h1>;
}
