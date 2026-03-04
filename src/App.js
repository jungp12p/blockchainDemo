import React, { Component } from "react";
import "./App.css";
import BlockchainWelcome from "./components/BlockchainWelcome";
import { Button } from "@blueprintjs/core";
import { action } from "./store";
import { HASH_ALGORITHMS } from "./hash";

class App extends Component {
  state = {
    ownBlockchainName: ""
  };
  pickBlockchain = name => {
    action({ type: "PICK_BLOCKCHAIN", name });
  };
  changeHashAlgorithm = evt => {
    action({ type: "CHANGE_HASH_ALGORITHM", algorithm: evt.target.value });
  };
  changeDifficulty = evt => {
    action({ type: "CHANGE_DIFFICULTY", difficulty: parseInt(evt.target.value, 10) });
  };
  render() {
    return (
      <div className="">
        <nav className="pt-navbar pt-dark">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Blockchain Demo</div>
          </div>

          <div className="pt-navbar-group pt-align-right">
            <span style={{ marginRight: "10px", color: "#bfccd6" }}>Hash Algorithm:</span>
            <select
                style={{ marginRight: "15px" }}
                onChange={this.changeHashAlgorithm}
                value={this.props.appState.hashAlgorithm}
                title="Choose the cryptographic hash algorithm"
              >
                {Object.keys(HASH_ALGORITHMS).map(key => (
                  <option key={key} value={key}>
                    {HASH_ALGORITHMS[key].name}
                  </option>
                ))}
              </select>
            <span style={{ marginRight: "10px", color: "#bfccd6" }}>Difficulty:</span>
            <select
                style={{ marginRight: "15px" }}
                onChange={this.changeDifficulty}
                value={this.props.appState.difficulty}
                title="Number of trailing zeros required for valid block hash"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            <select
                onChange={evt => {
                  this.pickBlockchain(evt.target.value);
                }}
                value={
                  this.props.appState.selectedBlockchain
                    ? this.props.appState.selectedBlockchain.name
                    : ""
                }
              >
                {[
                  <option key="default" value="">
                    Pick a blockchain or
                  </option>
                ].concat(
                  this.props.appState.blockchains.map(b => (
                    <option key={b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))
                )}
              </select>
            <div className="pt-control-group">
              <div className="pt-input-group">
                <input
                  className="pt-input"
                  placeholder="create your own"
                  value={this.state.ownBlockchainName}
                  style={{ paddingRight: "150px" }}
                  onChange={evt =>
                    this.setState({ ownBlockchainName: evt.target.value })
                  }
                  onKeyPress={evt => {
                    if (evt.charCode === 13) {
                      this.pickBlockchain(this.state.ownBlockchainName);
                    }
                  }}
                />
                <div className="pt-input-action">
                  <Button
                    text="Create"
                    onClick={() =>
                      this.pickBlockchain(this.state.ownBlockchainName)
                    }
                  />  
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="container" style={{ padding: 24 }}>
          {this.props.appState.selectedBlockchain === undefined && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p>Select an existing blockchain or create your own using the dropdown above</p>
            </div>
          )}
          {this.props.appState.selectedBlockchain !== undefined && (
            <BlockchainWelcome
              blockchain={this.props.appState.selectedBlockchain}
              node={this.props.appState.node}
              identities={this.props.appState.identities}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
