import React, { Component } from 'react';
import './App.css';
import AddUser from './components/AddUser';
import SelectUser from './containers/SelectUser';
import AddDocument from './containers/AddDocument';
import Documents from './containers/Documents';


class App extends Component {
  render() {
    return (
      <div>
        <AddUser/>
        <SelectUser/>
        <AddDocument/>
        <Documents/>
      </div>
    );
  }
}

export default App;
