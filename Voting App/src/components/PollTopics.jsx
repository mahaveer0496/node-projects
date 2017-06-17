import React from 'react';
import { Link } from 'react-router-dom';

const PollTopics = ({polls}) => {
  return (
    <div>
      {polls.map(poll => (
        <p key={poll._id}>{poll.poll} <Link to={`/${poll._id}`} >Go here!</Link></p>
      ))}
    </div>
  );
};

export default PollTopics;
