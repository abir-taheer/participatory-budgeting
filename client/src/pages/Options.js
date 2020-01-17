import React from "react";

import {Card} from "@rmwc/card";
import '@material/card/dist/mdc.card.css';
import {AppContext} from "../comps/AppProvider";
import {AuthButton} from "../comps/AuthButton";
import proposals from "../proposals";

import {Button} from "@rmwc/button";
import '@material/button/dist/mdc.button.css';
import {Link} from "react-router-dom";

import {Grid, GridCell} from "@rmwc/grid";
import '@material/layout-grid/dist/mdc.layout-grid.css';

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
export const shuffle = (a) => {
	let j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
};


export const Options = props => {
	shuffle(proposals);

	const context = React.useContext(AppContext);

	const logout = () => {
		fetch("/auth/logout")
			.then(res => res.json())
			.then(data => {
				if( window.document.cookie.includes("voting_station"))
					document.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.origin}`;
				context.updateState();
			});
	};

	return (
		<div>
			<Card outlined style={{width: "90vw", margin: "2rem 5vw", padding: "1rem"}}>
				<div style={{textAlign: "center"}}>
					<h1>Consider your options...</h1>
					<p style={{color: "grey"}}>(Scroll down to the bottom to vote!)</p>
					{context.signed_in &&
						<Button outlined onClick={logout}>Log Out</Button>
					}
				</div>

				<Grid>
					{
						proposals.map(i => (
							<GridCell span={4} key={i.id} >
								<h2>{i.name}</h2>
								<p>{i.description}</p>
							</GridCell>
						))
					}
				</Grid>

				{context.signed_in ?
					(
						<div style={{textAlign: "center"}}>
							<Link to={"/vote"} className={["UnstyledLink"]} >
								<Button raised>I'm ready to vote</Button>
							</Link>
						</div>
					) :
					(
						<div style={{textAlign: "center"}}>
							<p>Sign in to vote!</p>
							<AuthButton/>
						</div>
					)
				}
			</Card>
		</div>
	);
};
