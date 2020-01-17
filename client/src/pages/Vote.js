import React from "react";

import {Card} from "@rmwc/card";
import '@material/card/dist/mdc.card.css';
import {VoteForm} from "../comps/VoteForm";
import {AppContext} from "../comps/AppProvider";

import {Button} from "@rmwc/button";
import '@material/button/dist/mdc.button.css';
import {Link} from "react-router-dom";

export const Vote = props => {
	const context = React.useContext(AppContext);

	const [waiting, setWaiting] = React.useState(true);
	const [hasVoted, setHasVoted] = React.useState(false);

	if(context.signed_in)
		fetch("/api/election/hasVoted")
			.then(res => res.json())
			.then(data => {
				setWaiting(false);
				if(data.success)
					setHasVoted(Boolean(data.voted));
			});

	return (
		<Card style={{width: "95vw", marginLeft: "2.5vw", padding: "2rem"}}>
			<Link to={"/"} className={["UnstyledLink"]}>
				<Button> &lt;- Back to Overview</Button>
			</Link>
			{!context.signed_in &&
				<h1>You need to be signed in to vote!</h1>
			}

			{!waiting && ! hasVoted && new Date("Fri, 17 Jan 2020 22:00:11 GMT") > new Date() &&
				<VoteForm/>
			}

			{!waiting && ! hasVoted && new Date("Fri, 17 Jan 2020 22:00:11 GMT") < new Date() &&
				<div>
					<p style={{textAlign: "center"}}>The period for voting is over</p>
					<Link to={"/results"} className={["UnstyledLink"]}>
						<Button>View Results</Button>
					</Link>
				</div>
			}

			{hasVoted &&
				<div>
					<h2 style={{textAlign: "center"}}>You've voted {context.name.split(" ")[0]}!</h2>
					<p style={{textAlign: "center"}}>Pick up your sticker from the first floor!</p>
					<img
						src={"https://media.giphy.com/media/Quyiuo4h1wqBYs5jrh/giphy.gif"}
						alt={"Thank you image"}
						style={{
							width: "350px",
							marginLeft: "calc(50% - 175px)"
						}}
					/>
				</div>
			}

		</Card>
	);

};
