import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

// components----
import PollAndItsForm from './PollAndItsForm';
import TopicsAndItsForm from './TopicsAndItsForm';
import Navigation from './Navbar';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Secret from './Secret';

// actions-----
import { getUser } from './../redux/actions/actions';

class App extends React.Component {

  render() {
    const { isAuthenticated, email } = this.props;
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={PollAndItsForm} />
          <Route path="/poll/:pollId" component={TopicsAndItsForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          {isAuthenticated && <Route path="/secret" component={Secret} />}
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = ({ isAuthenticated, email }) => ({ isAuthenticated, email });

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

