import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import io from 'socket.io-client';
import { connect } from 'react-redux';
import * as actions from './actions/actions';

const mapStateToProps = (state) => ({
  gameRooms: state.gameRooms,
  createNewRoom: state.createNewRoom
})

const mapDispatchToProps = (dispatch) => ({
  updateRoomsToDisplay(rooms) {
    dispatch(actions.updateRoomsToDisplay(rooms))
  },
  addRoomsToStore() {
    dispatch(actions.incrementFailedGuesses());
  },

});

class Splash extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect('localhost:3000');
  }

  componentDidMount(){

    this.socket.on('loadRooms', (rooms)=>{
      console.log("ROOMS in SPLASH", rooms)
      this.props.updateRoomsToDisplay(rooms, console.log("updated state", this.props.gameRooms))
    })

  }

  render() {
    return (
      <React.Fragment>
        <button onClick={()=>this.props.dispatch()}>Create New Room</button>
        
        <Link to='/game/1'>
          <button >Game</button>
        </Link>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)