import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }
  
  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    fetch('/users')
      .then(res => res.json())
      .then(users => {
        this.setState({ users: users.data.users });
      })
      .catch(err => console.log);
  }

  addRandomUser = () => {
    const names = ["Mike", "Matt", "Scott", "Tom", "Torphy", "Dave", "Chaku", "Poppy", "Derek Jeter"];
    const name = names[Math.floor(Math.random() * names.length)];

    fetch("/users/add", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({name})
    })
      .then((res) => {
        this.getUsers();
      })
      .catch((res) => {
        console.log(res)
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <br/><br/>
          <button onClick={this.addRandomUser}>Add user</button>
          <br/><br/>
          {this.state.users.length === 0 && (
            <div>There are no users... click above to add one.</div>
          )}
          {this.state.users.length > 0 && this.state.users.map((user, i) => 
            <div key={i}>{user.name}</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
