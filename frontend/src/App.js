import React, { Component } from 'react';
import './App.css';
import Torus from "@toruslabs/torus-embed";
//import Counter from './pages/Counter.js';
//import Header from './pages/Header.js';
//import Footer from './pages/Footer.js';
import Web3 from 'web3';
//import Portis from '@portis/web3'
//import {CONTRACT_ADDRESS, CONTRACT_ADDRESS_ABI} from './config.js';
import { Box, Button, Heading, Text } from 'rimble-ui'


class App extends Component {

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

    //const infuraNode = {
    //  nodeUrl: '',
    //  chainId: ''
    //}
    //const portis = new Portis('96749b1d-1384-4d19-96fb-bad5a4a76fff', infuraNode)




    // Skale
    //const mySkaleChain = {
    //  nodeUrl: "[ENDPOINT]",
    //  chainId: 1,
    //  nodeProtocol: 'rpc'
    //}
    // const portis = new Portis('96749b1d-1384-4d19-96fb-bad5a4a76fff', 'mySkaleChain')
    // const portis = new Portis('96749b1d-1384-4d19-96fb-bad5a4a76fff', 'mainnet')
    // const web3 = new Web3(portis.provider)
     const accounts = await web3.eth.getAccounts()
    // this.setState({ account: accounts[0] })

    //web3.eth.getAccounts((error, accounts ) => {
    //  console.log(accounts)
    //})

  //  const web3 = new Web3(Web3.givenProvider || 'https://localhost:8545')
  //  const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] });

    // set contract
    //const testContract = new Web3.eth.Contract(CONTRACT_ADDRESS, CONTRACT_ADDRESS_ABI)
  //  this.setState({ testContract })
    //const count = await testContract.methods.getCounter().call()
    //this.setState({ count })

  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      counter: 0
    };
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
