import React, { Component } from 'react';
import './App.css';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config.js';
import Torus from "@toruslabs/torus-embed";
import Web3 from 'web3';
import { Box, Button, Heading, Text } from 'rimble-ui';
import IPFSUpload from './components/IPFSUpload';
import Increment from './components/Increment'
import ipfsAPI from 'ipfs-http-client'

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
    this.setState({contract: contract});

    const getCounter = await contract.methods.counter().call()
    this.setState({ counter: getCounter })

  }



  IPFSUploadButton = async(files) => {
    console.dir("App.js: IPFSUploadButton: files: "+await files);
    this.uploadToIpfs(files);
  }


  async uploadToIpfs(files) {
      let ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
      let fileDetails = [];
      for await (let file of files) {
        fileDetails.push({path: 'dumango/'+file.name, content: file})
        console.log("fileDetails: "+fileDetails)
      }
     const options = {
       wrapWithDirectory: true,
       progress: (prog) => console.log(`received: ${prog}`)
     }
     const source = ipfs.add(fileDetails, options)
     try {
       for await (const file of source) {
         console.log(file)
         this.setState({ added_file_hash: file.cid.toString() })
       }
     } catch (err) {
       console.error(err)
     }
   }


   IncrementButton = async() => {
     console.log("Increment Button")
     this.increment()
   }

   async increment() {
     await this.state.contract.methods.incrementCounter().send({from: this.state.account});
     var newCounter = this.state.contract.methods.counter().call();
     this.setState({ counter: newCounter })
   }



  render() {
    return (
      <div className="App">
        <IPFSUpload IPFSUploadButton={this.IPFSUploadButton} />
        <br />
        <Increment IncrementButton={this.IncrementButton} account={this.state.account} counter={this.state.counter} />
      </div>
    );
  }

}

export default App;
