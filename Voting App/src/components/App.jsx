import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import PollAndItsForm from './PollAndItsForm';
import TopicsAndItsForm from './TopicsAndItsForm';
import Navigation from './Navbar';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Secret from './Secret';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
    this.handleAuth = this.handleAuth.bind(this);
  }
  handleAuth() {
    axios.get('/user/checkAuth').then((res) => {
      this.setState({
        isAuthenticated: res.data,
      });
    });
  }
  render() {
    const { isAuthenticated } = this.state;
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={PollAndItsForm} />
          <Route
            path="/login"
            render={() => <LoginForm handleAuth={this.handleAuth} />}
          />
          <Route
            path="/register"
            render={() => <RegisterForm handleAuth={this.handleAuth} />}
          />
          <Route
            path="/secret"
            render={() => {
              if (isAuthenticated) return <Secret />;
              return <h1>Unauthenticated</h1>;
            }}
          />
          <Route path="/poll/:pollId" component={TopicsAndItsForm} />
        </Switch>
      </div>
    );
  }
}

export default App;

