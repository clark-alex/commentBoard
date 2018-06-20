import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      message:'',
      messages:[],
      userId :''
    }
    this.updateMessages = this.updateMessages.bind(this)
    this.setUserId = this.setUserId.bind(this)
    this.handlechange = this.handlechange.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }
  componentDidMount(){
    this.socket = io('/');// '/' represents the url to the server. since we are using a proxy, we can just use '/'
    this.socket.on('message dispatched', this.updateMessages)// these are socket event listeners
    this.socket.on('welcome', this.setUserId)// the user id is generated and sent from the server when a new page loads in.
  }

  updateMessages(message){
    const updatedMessages = this.state.messages.slice()
    updatedMessages.push(message)
    this.setState({
      messages:updatedMessages
    })
  }

  setUserId(user){
    console.log(user)
    this.setState(user)
  }
  sendMessage(){
    this.socket.emit('message sent', {
      message: this.state.message,
      user: this.state.userId
    })
    this.setState({message:''})
  }
  handlechange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  render() {
    console.log(this.state)
    const messages = this.state.messages.map((e,i) => {
      const styles = e.user === this.state.userID ? {alignSelf: "flex-end", backgroundColor: "#2d96fb", color: "white"} : {alignSelf: "flex-start", backgroundColor: "#e5e6ea"}
      return (
        <p key={i} style={styles}>{e.message}</p>
      )
    })

    return (
      <div className="App">
        <div className="messages">
          {messages}
        </div>
        <div className="input">
          <input name='message' value={this.state.message} onChange={this.handlechange} />
          <button onClick={this.sendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default App;
