import React, { Component } from 'react';
import { Input, Button } from "rimble-ui";

class Increment extends Component {

  constructor(props) {
    super(props)
    this.onClickHandler = this.onClickHandler.bind(this)
  }

  onClickHandler(e) {

  }


  render() {
    return (
      <div className="Increment">
        <Button onClick={this.onClickHandler}>Increment Counter</Button>
      </div>
    );
  }

}

export default Increment;
