import React from 'react';
import axios from 'axios';

const AddTopicForm = () => {
  let topicTitle = null;
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(topicTitle);
    topicTitle.value = '';
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="topicTitle"
          ref={(input) => { topicTitle = input; }}
          placeholder="Enter topic"
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddTopicForm;
