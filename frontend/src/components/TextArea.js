import React, { useState,setState, state } from "react";



class Component extends React.Component {
  constructor(props) {
    super(props);
    this.greetings = ["Hi", "Hello", "Heyo"]
    this.state = {
      greetingIndex: 0
    };
  }
  componentDidMount() {
    setInterval( () => {
      this.setState({
        greetingIndex: this.state.greetingIndex+1
      });
      if (this.state.greetingIndex == (this.greetings.length)) {
        this.setState({
          greetingIndex: 0
        });
      }
    }, 2000);
  }
  render() {
    return (
      <div>
        <h1>Greeting: {this.greetings[this.state.greetingIndex] }</h1>
      </div>
    );
  }
};


export default Component;
