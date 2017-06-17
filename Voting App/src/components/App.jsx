import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PollTitlesAndItsForm from './PollAndItsForm';

class App extends Component {  
  render() {
    // const { polls } = this.state;
    return (
      <Switch>
        <Route path="/" component={PollTitlesAndItsForm} />
      </Switch>
    );
  }
}

export default App;


// constructor(props) {
  //   super(props);
  //   this.state = {
  //     polls: [],
  //   };
  //   this.pollTitle = null;
  //   this.topicTitle = null;
  //   axios.get('http://localhost:3000/api').then((res) => {
  //     this.setState({
  //       polls: res.data,
  //     });
  //   });
  // }


  // increaseVotes(pollId, topicId) {
  //   axios.post(`http://localhost:3000/api/${pollId}/${topicId}`).then((res) => {
  //     this.setState({
  //       polls: res.data,
  //     });
  //   });
  // }