import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PollAndItsForm from './PollAndItsForm';
import TopicsAndItsForm from './TopicsAndItsForm';

class App extends Component {
  render() {
    // const { polls } = this.state;
    return (
      <Switch>
        <Route exact path="/" component={PollAndItsForm} />
        <Route path="/poll/:pollId" component={TopicsAndItsForm} />
      </Switch>
    );
  }
}

export default App;

