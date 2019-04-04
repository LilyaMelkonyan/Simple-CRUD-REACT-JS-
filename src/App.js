import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import userList from './jsons/users';
import pointList from './jsons/points';

import View from './pages/view/View.js';

class App extends Component {
  render() {
    return (
      <View userInfo={userList} pointInfo={pointList} />
    );
  }
}

export default App;
