import React, { Component } from 'react';
import RenderMap from './Components/Map/RenderMap';
import AddBathroomForm from './Components/Map/AddBathroomForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RenderMap />
        <AddBathroomForm />
      </div>
    );
  }
}

export default App;
