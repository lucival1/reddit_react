import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Links } from "./pages/links";
import { Cats } from './pages/cats';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { TopNavBar } from './components/top_navbar/top_navbar';

ReactDOM.render(
    // This is the router component
    <BrowserRouter>
        {
            /*
                This is how you do a comment in JSX!
            */
        }
        <div>
            <TopNavBar/>
            {
                /*
                    The Switch component will render one of the components
                    The rendered component will be the one in the Route with
                    the matching path
                */
            }
            <Switch>
                {
                    /*
                        The Route component can be used to declare the 
                        pages in our single page web application
                    */
                }
                <Route exact path="/" component={Links} />
                <Route exact path="/cats" component={Cats} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={Profile} />
            </Switch>
            <div>Footer!</div>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
