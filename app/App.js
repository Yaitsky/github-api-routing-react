import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';

import { browserHistory, IndexRoute, Router, Route, Link } from 'react-router';

import About from './About';
import Home from './Home';
import Repos from './Repos';
import ServerError from './ServerError';

import RepoDetails from './RepoDetails';

class App extends Component {
  render() {
    return(
      <div>
        <header>App</header>
        <menu>
          <ul>
            <li><Link activeClassName="active" to="/home">Home</Link></li>  
            <li><Link activeClassName="active" to="/about">About</Link></li>   
            <li><Link activeClassName="active" to="/repos">Repos</Link></li>                              
          </ul>
        </menu>
        {this.props.children}
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="home" component={Home}/>    
      <Route path="about" component={About} title="About Us"/>
      <Route path="repos" component={Repos}>
        <Route path="/repos/:repo_name" component={RepoDetails}/>
      </Route>
      <Route path="error" component={ServerError} />
    </Route>
  </Router>
), document.getElementById('root'));
