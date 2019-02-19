/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

class Clock extends Component {
  constructor() {
    super();
    this.state = {
      time: new Date().toLocaleTimeString(),
    };
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    this.intervalID = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  updateTime() {
    this.setState({ time: new Date().toLocaleTimeString() });
  }

  render() {
    const { time } = this.state;
    return (
      <React.Fragment>
        <span className="clock">{time}</span>
      </React.Fragment>
    );
  }
}

export default Clock;
