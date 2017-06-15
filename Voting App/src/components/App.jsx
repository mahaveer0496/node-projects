import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.name = null;
    this.choice = null;
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:3000/api').then((res) => console.log(res));

    // let x = fetch('http://localhost:3000/api', {
    //   headers: {
    //     'Content-Type': 'application/json', 'Accept': 'application/json'
    //   },
    //   mode: 'no-cors'
    // })
    //   .then(res => res.json())
    //   .then(json => { console.log(json) })

    this.name.value = '';
    this.choice.value = '';
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" ref={(input) => { this.name = input; }} />
          <input type="text" name="choice" ref={(input) => { this.choice = input; }} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
