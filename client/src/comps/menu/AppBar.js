import React from "react";

import {SimpleTopAppBar, TopAppBarFixedAdjust} from "@rmwc/top-app-bar";
import '@material/top-app-bar/dist/mdc.top-app-bar.css';
import '@material/icon-button/dist/mdc.icon-button.css';

import '@rmwc/icon/icon.css';
import {AppContext} from "../AppProvider";

export const AppBar = (props) => {
	const context = React.useContext(AppContext);

	const logout = () => {
		fetch("/auth/logout")
			.then(res => res.json())
			.then(data => {
				if(data.success || window.document.cookie.includes("voting_station"))
					document.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.origin}`;
				else context.updateState();
			});
	};

	return (
		<div>
			<SimpleTopAppBar
				title={<span>Participatory Budgeting</span>}
				// navigationIcon
				onNav={props.toggleDrawer}
				className={["AppBar"]}
				actionItems={context.signed_in ? [
					{ icon: 'power_settings_new', onClick: logout}
				] : []}
				fixed
			/>
			<TopAppBarFixedAdjust/>
		</div>
	);
};
