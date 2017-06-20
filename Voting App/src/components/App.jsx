import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PollAndItsForm from './PollAndItsForm';
import TopicsAndItsForm from './TopicsAndItsForm';
import Navigation from './Navbar';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class App extends Component {
  render() {
    // const { polls } = this.state;
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={PollAndItsForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/poll/:pollId" component={TopicsAndItsForm} />
        </Switch>
      </div>
    );
  }
}

export default App;

