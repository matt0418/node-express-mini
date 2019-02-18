import React, { Component } from 'react';
import UsersWithRouter from './components/Users'
import UserInfo from './components/UserInfo'
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <UsersWithRouter />
      </div>
    );
  }
}

export default App;
