import React, { Component } from 'react';

import './css/main.css';

import routes from './routes'

import NavBar from './Components/NavBar'


class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        {routes}
      </div>
    );
  }
}

export default App;
