import React from "react";

import {Card} from "@rmwc/card";
import '@material/card/dist/mdc.card.css';

import {AppContext} from "../comps/AppProvider";
import {Link} from "react-router-dom";

import {Button} from "@rmwc/button";
import '@material/button/dist/mdc.button.css';

import proposals from "../proposals";
import {AuthButton} from "../comps/AuthButton";

import {List, SimpleListItem} from "@rmwc/list";
import '@material/list/dist/mdc.list.css';
import {Icon} from "@rmwc/icon";

let updated = false;
export const Results = props => {
	const context = React.useContext(AppContext);

	const [results, setResults] = React.useState({
		rounds: [],
		winner: null,
		success: false
	});

	fetch("/api/election/results")
		.then(res => res.json())
		.then(data =>{
			if(!updated){
				updated = true;
				setResults(data);
			}
		});

	if(!results.success){
		return (
			<Card style={{width: "95vw", marginLeft: "2.5vw", padding: "2rem", textAlign: "center"}}>
				<h1>Couldn't display results</h1>
				<p>{results.error}</p>

				{! context.signed_in &&
					<div><AuthButton/></div>
				}
			</Card>
		)
	}

	return (
		<Card style={{width: "95vw", marginLeft: "2.5vw", padding: "2rem"}}>
			<Link to={"/"} className={["UnstyledLink"]}>
				<Button> &lt;- Back to Overview</Button>
			</Link>

			<h1>Results</h1>
			{results.rounds.map((round, index) => {
				let data = [];
				for(let id in round.count){
					data.push(<SimpleListItem
						key={id}
						text={proposals[Number(id)].name}
						secondaryText={`${round.count[id]} votes - ${Math.round(10000 * (round.count[id] / round.votes_counted)) / 100}%`}
					/>)
				}

				return (
					<div>
						<h2>Round {index + 1}</h2>
						<List twoLine>
							{data}
						</List>
					</div>
				)
			})}
			<h2>The winner is: <span style={{color: "green"}}>{proposals[Number(results.winner)].name}</span> </h2>
		</Card>
	);

};
