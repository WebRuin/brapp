import React, { Component } from 'react';

import * as MapActions from '../../Actions/MapActions';

import styles from './renderMap.css';

export default class AddBathroomForm extends Component {
  handleAddBathroom(e) {
    e.preventDefault()
    let bathroom = {
      name: this.refs.bathroomName.value,
      address: this.refs.bathroomStreet.value + ', ' + this.refs.bathroomCity.value + ', ' + this.refs.bathroomState.value  + '  ' + this.refs.bathroomZip.value,
    }
    MapActions.addBathroom(bathroom);
    // this.refs.addBathroomForm.reset();
  }

  toggleAddBathroomForm() {
    MapActions.toggleAddBathroomFormState();
  }

  render() {
    return (
      <div className='addBathroomForm'>
        <form ref='addBathRoomForm' onSubmit={ this.handleAddBathroom.bind(this) } >
          <div><input ref='bathroomName' placeholder='Bathroom Name' required /></div>
          <div><span>Bathroom Address</span></div>
          <div><input ref='bathroomStreet' placeholder='Street' required /></div>
          <div><input ref='bathroomCity' placeholder='City' required /> </div>
          <div><input ref='bathroomState' placeholder='State' required /></div>
          <div><input ref='bathroomZip' placeholder='Zip' required /></div>
          <div>
            <button onClick={ this.toggleAddBathroomForm }>Cancel</button>
            <button type='submit'>Add Bathroom</button>
          </div>
        </form>
      </div>
    )
  }
}