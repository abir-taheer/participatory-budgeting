import React from "react";

import {GoogleLogin} from "react-google-login";
import {AppContext} from "./AppProvider";
import {MessageQueue} from "./MessageQueue";

export const AuthButton = props => {

	const context = React.useContext(AppContext);

	const onSuccess = (payload) => {
		fetch("/auth/login", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({idToken: payload.tokenId})
		})
			.then(res => res.json())
			.then(data => {
				if(! data.success)
					MessageQueue.notify({
						body: data.error,
						actions: [{"icon": "close"}]
					});
				else
					context.updateState() && window.sessionStorage.clear();
			});
	};

	return (
		<GoogleLogin
			clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
			buttonText="Login with Google"
			onSuccess={onSuccess}
			onFailure={console.log}
			cookiePolicy={'single_host_origin'}
		/>
	);
};
