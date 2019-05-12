import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Links } from "./pages/links";
import { LinkDetails } from "./pages/link_details";
import { LinkEditor } from "./pages/link_editor";
import { Login } from './pages/login';
import { Header } from "./components/header/header";
import { UserDetails } from "./pages/user_details";

ReactDOM.render(
  // This is the router component
  <BrowserRouter>
    {
      /*
          This is how you do a comment in JSX!
      */
    }
    <div>
      <Header/>
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
        <Route exact path="/" component={Links}/>
        <Route exact path="/link/:link_id" component={LinkDetails}/>
        <Route exact path="/link_editor/:link_id" component={Links}/>
        <Route exact path="/link_editor" component={LinkEditor}/>
        <Route exact path="/user/:user_id" component={UserDetails}/>
        <Route exact path="/sign_in" component={Login}/>
        <Route exact path="/sign_up" component={Login}/>

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
