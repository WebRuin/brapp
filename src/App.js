import React, { Component } from 'react';

import RenderMap from './Components/Map/RenderMap';
import AddBathroomForm from './Components/Map/AddBathroomForm';
import AddBathroomFormButton from './Components/Map/AddBathroomFormButton';
import Nav from './Components/Layout/Nav';
import MapStore from './Stores/MapStore';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddBathroomFormOpen: MapStore.setAddBathroomFormState(),
    }
    this.getAddBathroomFormState = this.getAddBathroomFormState.bind(this);
  }

  componentWillMount() {
    MapStore.on("change", this.getAddBathroomFormState);
  }

  componentWillUnmount() {
    MapStore.removeListener("change", this.getAddBathroomFormState);
  }

  getAddBathroomFormState() {
    this.setState({
      isAddBathroomFormOpen: MapStore.setAddBathroomFormState(),
    });
  }

  render() {

    const addBathroomFormState = this.state.isAddBathroomFormOpen ? <AddBathroomForm /> : <AddBathroomFormButton />

    return (
      <div className="App">
        <Nav />
        <RenderMap />
        { addBathroomFormState }
      </div>
    );
  }
}

export default App;
