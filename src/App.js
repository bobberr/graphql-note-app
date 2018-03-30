import React, { Component } from 'react';
import './App.css';
import AddUser from './components/AddUser';
import SelectUser from './containers/SelectUser';
import AddDocument from './containers/AddDocument';
import Documents from './containers/Documents';
import DocumentDisplay from './containers/DocumentDisplay';


class App extends Component {
  render() {
    return (
      <div>
        <AddUser/>
        <SelectUser/>
        <AddDocument/>
        <Documents/>
        <DocumentDisplay/>
      </div>
    );
  }
}

export default App;
