import React, { Component } from "react";
import classnames from "classnames";
import { Tab2, Tabs2, Button } from "@blueprintjs/core";
import NewBlockHeader from "./NewBlockHeader";
import NewBlockTransactionList from "./NewBlockTransactionList";
import UTXOPoolTable from "./UTXOPoolTable";
class NewBlock extends Component {
  addBlock = evt => {
    if (this.props.block.isValid()) {
      this.props.block.blockchain.addBlock(this.props.block);
      this.props.onCancel();
    }
  };

  rerender = () => {
    this.forceUpdate();
  };
  render() {
    const identities = this.props.identities ? Object.values(this.props.identities) : [];
    return (
      <div style={{ padding: "10px" }}>
        {identities.length > 1 && (
          <div style={{ marginBottom: "15px" }}>
            <label>
              <strong>Miner (receives 10 coin reward):</strong>
              <select
                value={this.props.selectedMinerPublicKey || ""}
                onChange={(evt) => this.props.onMinerChange && this.props.onMinerChange(evt.target.value)}
                style={{ marginLeft: "10px", padding: "5px" }}
              >
                {identities.map(identity => (
                  <option key={identity.publicKey} value={identity.publicKey}>
                    {identity.name} ({identity.publicKey.substr(0, 10)}...)
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        <Tabs2
          onChange={(newTabId, prevTabId, event) => {
            // Tab changed
          }}
        >
          <Tab2
            id="blockheader"
            title="Mining"
            panel={
              <NewBlockHeader
                block={this.props.block}
                rerender={this.rerender}
              />
            }
          />
          <Tab2
            id="txs"
            title="Transactions"
            panel={
              <NewBlockTransactionList
                block={this.props.block}
                rerender={this.rerender}
              />
            }
          />
          <Tab2
            id="utxopool"
            title="Preview"
            panel={
              <div>
                <UTXOPoolTable block={this.props.block} />
              </div>
            }
          />
        </Tabs2>

        <div style={{ float: "right", marginTop: '20px' }}>
          <Button
            iconName="pt-icon-add"
            className={classnames("pt-intent-primary", {
              "pt-disabled": !this.props.block.isValid()
            })}
            onClick={this.addBlock}
            title="Once you find a valid nonce (hash ending in zeros), broadcast your block to the network!"
          >
            Broadcast Block
          </Button>

          <Button
            style={{ marginLeft: "10px", marginRight: "24px" }}
            onClick={this.props.onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default NewBlock;
