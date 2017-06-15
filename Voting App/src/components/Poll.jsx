import React from 'react';

const PollField = ({ topics, key }) => (
  <select key={key}>
    {topics.map((topic, index) => (
      <option key={index} value={topic.title}>{topic.title}</option>
    ))}
  </select>
);

export default PollField;
