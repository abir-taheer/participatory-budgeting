import React from "react";

import {Card} from "@rmwc/card";
import '@material/card/dist/mdc.card.css';
import {AppContext} from "../comps/AppProvider";
import {AuthButton} from "../comps/AuthButton";

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

	const context = React.useContext(AppContext);

	let all_options = [
		{
			name: "Hand Sanitizer Stations",
			description: ""
		},
		{
			name: "Charging Stations (Locked Cabinets)",
			description: ""
		},
		{
			name: "Charging Stations (Password Protected Docks)",
			description: ""
		},
		{
			name: "Water Filling Stations",
			description: ""
		},
		{
			name: "Printing Station (Cloud Printer)",
			description: ""
		},
		{
			name: "Printing Station (Computer Based)",
			description: ""
		}
	];

	all_options = shuffle(all_options);

	return (
		<div>
			<Card outlined style={{width: "90vw", margin: "2rem 5vw"}}>
				<div style={{textAlign: "center"}}>
					<h1>Consider your options...</h1>
					<p style={{color: "grey"}}>(Scroll down to the bottom to vote!)</p>
				</div>
				{
					all_options.map(i => (
						<div>
							<h2>{i.name}</h2>
							<p>{i.description}</p>
						</div>
					))
				}

				{context.signed_in ?
					(
						<div>
							<p>You're signed in!</p>
							<button>Click here to vote!</button>
						</div>
					) :
					(
						<div>
							<p>You're not signed in!</p>
							<AuthButton/>
						</div>
					)
				}
			</Card>
		</div>
	);
};
