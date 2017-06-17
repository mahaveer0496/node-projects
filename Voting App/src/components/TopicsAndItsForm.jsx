import React, { Component } from 'react';
import AddTopicForm from './AddTopicForm';
import PollTopics from './PollTopics';

class TopicsAndItsForms extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <div>
        <AddTopicForm />
        <PollTopics />
      </div>
    );
  }
}

export default TopicsAndItsForms;
