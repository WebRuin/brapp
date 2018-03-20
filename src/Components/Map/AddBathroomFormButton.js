import React, { Component } from 'react';

import * as MapActions from '../../Actions/MapActions';

import './renderMap.css';

export default class AddBathroomFormButton extends Component {
  handleToggleBathroomForm() {
    MapActions.toggleAddBathroomFormState();
  }

  render() {
    return (
      <div className='addBathroomFormButton' onClick={ this.handleToggleBathroomForm }>+</div>
    )
  }
}