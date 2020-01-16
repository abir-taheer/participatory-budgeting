import React from "react";

import {Drawer, DrawerContent, DrawerHeader, DrawerSubtitle, DrawerTitle} from "@rmwc/drawer";
import '@material/drawer/dist/mdc.drawer.css';

import {List} from "@rmwc/list";
import '@material/list/dist/mdc.list.css';
import {MenuItem} from "./MenuItem";

export const NavDrawer = (props) => {
	return (
		<Drawer modal open={props.drawerOpen} onClose={() => props.toggleDrawer(false)}>
			<DrawerHeader>
				<DrawerTitle>Quicker Picker Upper</DrawerTitle>
				<DrawerSubtitle>Signed-in-status</DrawerSubtitle>
			</DrawerHeader>
			<DrawerContent>
				<List className={["DrawerContent"]} onClick={() => props.toggleDrawer(false)}>
					<MenuItem
						to={"/"}
						text={"Your Feed"}
						icon={"home"}
						activeRoute={"/"}
						exactRoute
					/>
				</List>
			</DrawerContent>
		</Drawer>
	);
};
