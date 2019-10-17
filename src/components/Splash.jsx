import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import io from 'socket.io-client';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  gameRooms: state.rooms.gameRooms,
  roomCount: state.rooms.gameRooms.length+1,
})

const mapDispatchToProps = (dispatch) => ({
  updateRoomsToDisplay(rooms) {
    dispatch(actions.updateRoomsToDisplay(rooms))
  },
});

class Splash extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect('localhost:3000');
    this.incrementRoomCount = ()=>{
      return this.props.roomCount
    }
  }
  componentWillUnmount() {
    this.socket.close();
  }
  
  componentDidMount(){
    this.socket.on('loadRooms', (rooms)=>{
      console.log("ROOMS in SPLASH", rooms)
      this.props.updateRoomsToDisplay(rooms)
    })
  }
  
  render() {
    const rooms = 
      this.props.gameRooms.map( 
        roomNumber => <Link className={"gameRoom"} to={'/game/'+roomNumber} key={'gameRoom'+roomNumber}>
                        <div >
                          <button style={{width:'200px', marginLeft:'30px'}} onClick={()=>this.socket.emit('joinRoom', roomNumber)} >Room Number {roomNumber}</button>
                        </div>
                      </Link> )
    return (
      <React.Fragment>
        <button style={{width:'200px', height: '100px', margin:'30px'}} onClick={()=>this.socket.emit('addRoom', this.incrementRoomCount())}>Create New Room</button>
        
        {rooms}

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)