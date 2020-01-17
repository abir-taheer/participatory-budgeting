import React from "react";
import Reorder, {reorder} from 'react-reorder';

import proposals from "../proposals";

import {List, SimpleListItem} from "@rmwc/list";
import '@material/list/dist/mdc.list.css';

import {Button} from "@rmwc/button";
import '@material/button/dist/mdc.button.css';

import {Icon} from "@rmwc/icon";
import '@rmwc/icon/icon.css';
import {MessageQueue} from "./MessageQueue";
import {AppContext} from "./AppProvider";
import {shuffle} from "../pages/Options";


export const VoteForm = (props) => {
	const context = React.useContext(AppContext);
	
	const sendVote = (selections) => {
		fetch("/api/election/vote", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({selections})
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

	const [items, setItems] = React.useState(proposals);

	const [isConfirming, setIsConfirming] = React.useState(false);

	const onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
		setItems(reorder(items, previousIndex, nextIndex));
	};

	const move = (index, up = true) => {
		if((up && index === 0) || (!up && index === items.length - 1))
			return;

		let new_items = [...items];

		let new_index = up ? index - 1 : index + 1;
		let temp = Object.assign({}, new_items[new_index]);

		new_items[new_index] = Object.assign({}, new_items[index]);
		new_items[index] = temp;

		setItems(new_items);
	};

	const [time, setTime] = React.useState(new Date());
	setTimeout(setTime, 1000, new Date());

	let start = new Date(process.env.REACT_APP_VOTING_START ||"Fri, 17 Jan 2020 13:45:49 GMT");
	let diff = start - time;
	if(time < start)
		return (
			<div style={{textAlign: "center"}}>
				<h2>
					Voting hasn't started yet.
				</h2>

				<p>
					Voting will happen from periods 2-9.
				</p>
				<p>
					Come back in {Math.floor(diff / (1000 * 60 * 60))}h {Math.floor((diff %  (1000 * 60 * 60)) / (60 * 1000))}m {Math.floor((diff %  (1000 * 60 )) / (1000 ))}s
				</p>
			</div>
		);

	return (
		<div>
			<h2 style={{textAlign: "center"}}>Rank your choices:</h2>
			<p style={{textAlign: "center"}}>Drag and drop the following in your order of preference</p>
			<List twoLine>
				<Reorder
					reorderId="my-list" // Unique ID that is used internally to track this list (required)
					lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
					holdTime={500} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
					touchHoldTime={500} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
					mouseHoldTime={200} // Hold time before dragging begins with mouse (optional), defaults to holdTime
					onReorder={onReorder} // Callback when an item is dropped (you will need this to update your state)
					disabled={isConfirming}
					placeholder={
						<div><br/><br/><br/></div>// Custom placeholder element (optional), defaults to clone of dragged element
					}
				>
					{
						items.map((item, i) => (
							<SimpleListItem
								key={item.id}
								text={(i + 1) + ". " + item.name}
								disabled={isConfirming}
								style={{border: "1px solid lightgrey", borderRadius: "5px"}}
								meta={
									<span className={["Desktop-Only"]}>
										<span onClick={() => move(i)}>
											<Icon style={{padding: "10px"}}
											      icon={{ icon: 'arrow_upward', size: 'medium' }}
											/>
										</span>

										<span onClick={() => move(i, false)}>
											<Icon style={{padding: "10px"}}
											      icon={{ icon: 'arrow_downward', size: 'medium' }}
											/>
										</span>
									</span>
								}
							/>
						))
					}
				</Reorder>
			</List>

			<br/>
			<Button raised onClick={() => setIsConfirming(true)} disabled={isConfirming}>Submit</Button>

			{isConfirming &&
				<div>
					<p>Are you sure?</p>
					<Button raised onClick={() => sendVote(items.map(i => i.id))}>Confirm</Button>
					&nbsp;&nbsp;
					<Button outlined  onClick={() => setIsConfirming(false)}>Cancel</Button>
				</div>
			}
		</div>
	);
};
