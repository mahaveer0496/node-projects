import React, { Component } from 'react';
import axios from 'axios';
import PollField from './Poll';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      polls: [],
    };
    this.pollTitle = null;
    this.title = null;
    axios.get('/api').then((res) => {
      this.setState({
        polls: res.data,
      });
    });
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    const { polls } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="pollTitle"
            ref={(input) => { this.pollTitle = input; }}
            placeholder="Enter poll name"
          />
          <input
            type="text"
            name="title"
            ref={(input) => { this.title = input; }}
            placeholder="Enter title for poll"
          />
           {/*{polls.map(poll => (
            <select key={poll._id}>
              {poll.topics.map((topic, index) => <option key={index} value={topic.title}>{topic.title}</option>)}
            </select>
            ))}*/}
         {polls.map(poll =>
            (<PollField
              id={poll._id}
              topics={poll.topics}
            />)
          )}
          <input type="submit" />
        </form>

      </div>
    );
  }
}

export default App;
