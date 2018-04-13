import React, { Component } from 'react';
import './App.scss';
import AddUser from './components/AddUser';
import SelectUser from './containers/SelectUser';
import AddDocument from './containers/AddDocument';
import Documents from './containers/Documents';
import DocumentDisplay from './containers/DocumentDisplay';


class App extends Component {
  render() {
    return (
      <div>
        <div className="top-panel">
          <AddDocument/> 
          <SelectUser/>                   
          <AddUser/>
        </div>
        <div className="bottom-panel">
          <Documents/>
          <DocumentDisplay/>
        </div>
      </div>
    );
  }
}

export default App;
