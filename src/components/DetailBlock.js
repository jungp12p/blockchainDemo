import React, { Component } from "react";
import { Tab2, Tabs2 } from "@blueprintjs/core";
import BlockInfo from "./BlockInfo";
import UTXOPoolTable from "./UTXOPoolTable";
import TransactionTable from "./TransactionTable";
class DetailBlock extends Component {
  render() {
    if (!this.props.block) {
      return <div style={{ padding: "10px" }}>Loading...</div>;
    }
    return (
      <div style={{ padding: "10px" }}>
        <Tabs2>
          <Tab2
            id="blockinfo"
            title="Block Info"
            panel={<BlockInfo block={this.props.block} />}
          />
          <Tab2
            id="transactions"
            title="Transactions"
            panel={<TransactionTable transactions={this.props.block.transactions} />}
          />
          <Tab2
            id="utxopool"
            title="UTXO Pool"
            panel={<UTXOPoolTable block={this.props.block} />}
          />
        </Tabs2>
      </div>
    );
  }
}

export default DetailBlock;
