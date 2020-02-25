import React, { Component } from 'react';
import './App.css';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config.js';
import Torus from "@toruslabs/torus-embed";
import Web3 from 'web3';
import { Box, Button, Heading, Text } from 'rimble-ui'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      counter: 0
    };
  }

  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {

    const torus = new Torus({
      buttonPosition: "bottom-left" // default: bottom-left
    });
    await torus.init({
      buildEnv: "production", // default: production
      enableLogging: true, // default: false
      network: {
        host: "ropsten", // default: mainnet
        chainId: 3, // default: 1
        networkName: "Ropsten Test Network" // default: Main Ethereum Network
      },
      showTorusButton: true // default: true
    });
    await torus.login(); // await torus.ethereum.enable()

    const web3 = new Web3(torus.provider);
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] });

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
    this.setState({contract};

    const getCounter = await contract.methods.counter().call()
    this.setState({ counter: getCounter })

  }

  render() {
    return (
      <div className="App">
        <Box>
          <Heading>
            <Text>Hello World</Text>
            <Text>Your Account: {this.state.account} </Text>
            <Text>Counter Number: {this.state.counter} </Text>
            <Button.Outline> Increment Counter </Button.Outline>
          </Heading>
        </Box>
      </div>
    );
  }

}

export default App;
