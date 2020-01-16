import React from 'react';
import './App.css';

import {Content} from "./comps/Content";
import {BrowserRouter} from "react-router-dom";
import {AppProvider} from "./comps/AppProvider";

import {SnackbarQueue} from "@rmwc/snackbar";
import {MessageQueue} from "./comps/MessageQueue";
import '@material/snackbar/dist/mdc.snackbar.css';
import '@material/button/dist/mdc.button.css';
import {AppBar} from "./comps/menu/AppBar";
import {NavDrawer} from "./comps/menu/NavDrawer";

function App() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = (open = (! drawerOpen)) => setDrawerOpen(open);

    return (
        <div className="App">
            <BrowserRouter>
                <AppProvider>
                    <NavDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}/>
                    <AppBar toggleDrawer={toggleDrawer}/>
                    <Content/>
                </AppProvider>
            </BrowserRouter>

            <SnackbarQueue messages={MessageQueue.messages}/>
        </div>
    );

}

export default App;
