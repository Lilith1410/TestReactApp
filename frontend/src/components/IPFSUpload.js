import React from 'react';
import {
  Input,
  Button
} from "rimble-ui";

class IPFSUpload extends React.Component {

  constructor(props) {
      super(props);
        this.state = {
          files: null
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    // store selected files in state
  onChangeHandler = async (e) => {
    this.setState({files: await e.target.files});
    console.dir("data: " +this.state.files+ " length: "+this.state.files.length+ " first object: "+this.state.files
    [0])
  }

  onClickHandler(e) {
    if(this.state.files !== null && this.state.files.length >= 1) {
      this.props.IPFSUploadButton(this.state.files);
    } else {
      alert("please select files");
    }
  }


  render() {
    return (
      <div>
      <Input type="file" name="selectFiles" onChange={this.onChangeHandler} multiple/>
      <br />
      <Button type="button" onClick={this.onClickHandler}>Upload to IPFS</Button>
      </div>
    );
  }
}
export default IPFSUpload;
