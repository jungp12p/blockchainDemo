import React, { Component } from "react";
import BlockchainTree from "./BlockchainTree";
import IdentityListItem from "./IdentityListItem";
import { Tab2, Tabs2 } from "@blueprintjs/core";
import WelcomeUTXOPoolTable from "./WelcomeUTXOPoolTable";
import "../App.css";
import AddIdentity from "./AddIdentity";

class BlockchainWelcome extends Component {
  state = {
    selectedIdentityForHistory: null
  };

  render() {
    return (
      <div>
        <div style={{ width: "65%", display: "inline-block", paddingRight: "20px" }}>
          <h3>Blockchain Tree (Blue = Longest Chain)</h3>
          <BlockchainTree
            blockchain={this.props.blockchain}
            identities={this.props.identities}
            node={this.props.node}
          />
        </div>
        <div
          style={{
            width: "35%",
            display: "inline-block",
            verticalAlign: "top"
          }}
        >
          <Tabs2>
            <Tab2
              id="utxo"
              title="UTXO Pool"
              panel={
                <div>
                  <p>Current balances on the longest chain. Click a UTXO to send a transaction.</p>
                  {this.props.blockchain.maxHeightBlock().isRoot() ? (
                    <p>No UTXOs yet - mine a block to earn rewards</p>
                  ) : (
                    <WelcomeUTXOPoolTable blockchain={this.props.blockchain} />
                  )}
                </div>
              }
            />
            <Tab2
              id="history"
              title="Transaction History"
              panel={
                <div>
                  <p>View complete transaction history for an identity</p>
                  <select
                    style={{ width: "100%", marginBottom: "15px", padding: "5px" }}
                    value={this.state.selectedIdentityForHistory || ""}
                    onChange={(e) => this.setState({ selectedIdentityForHistory: e.target.value })}
                  >
                    <option value="">Select an identity...</option>
                    {Object.values(this.props.identities).map(identity => (
                      <option key={identity.publicKey} value={identity.publicKey}>
                        {identity.name}
                      </option>
                    ))}
                  </select>
                </div>
              }
            />
          </Tabs2>
          <hr />
          <Tabs2>
            <Tab2
              id="nodes"
              title="Your Identities"
              panel={
                <div>
                  <p>Your public/private key pairs. You control coins owned by these keys.</p>
                  {Object.values(this.props.identities).map(identity => (
                    <IdentityListItem
                      key={identity.publicKey}
                      identity={identity}
                    />
                  ))}
                  <AddIdentity />
                </div>
              }
            />
          </Tabs2>
        </div>
      </div>
    );
  }
}

export default BlockchainWelcome;
