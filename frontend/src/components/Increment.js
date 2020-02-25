import React, { Component } from 'react';
import { Box, Button, Heading, Text }from "rimble-ui";

class Increment extends Component {

  constructor(props) {
    super(props)
    this.onClickHandler = this.onClickHandler.bind(this)
  }

  onClickHandler(e) {
    this.props.IncrementButton()
  }


  render() {
    return (
      <div className="Increment">
            Hello World <br />
            Your Account: {this.props.account} <br />
            Counter Number: {this.props.counter} <br />
            <Button onClick={this.onClickHandler}>Increment Counter</Button>
      </div>
    );
  }

}

export default Increment;
