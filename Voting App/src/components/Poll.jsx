import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

const PollField = ({ topics }) => (
  <select>
    {topics.map(topic => (
      <option
        key={shortid.generate()}
        value={topic.title}
      >
        {topic.title}
      </option>
    ))}
  </select>
);

PollField.propTypes = {
  id: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  })).isRequired,
};
export default PollField;

