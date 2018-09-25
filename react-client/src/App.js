import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = { users: [] };

  componentDidMount() {
    fetch("/users")
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        {this.state.users.map(user => (
          <div key={user.id}>
            user: {user.name} Password: {user.password}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
