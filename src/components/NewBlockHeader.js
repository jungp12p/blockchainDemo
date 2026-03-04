import React, { Component } from "react";
import { hash, getCurrentAlgorithm, HASH_ALGORITHMS } from "../hash";
import classnames from "classnames";
import { Button } from "@blueprintjs/core";
import Key from "./Key";

export default class NewBlockHeader extends Component {
  changeNonce = evt => {
    this.props.block.setNonce(evt.target.value);
    this.props.rerender();
  };
  tryUntilFound = () => {
    if (!this.props.block.isValid()) {
      this.props.block.setNonce(
        hash(new Date().getTime().toString())
      );
      this.props.rerender();

      if (!this.props.block.isValid()) {
        setTimeout(this.tryUntilFound, 2);
      }
    }
  };
  render() {
    return (
      <div>
        <table className="pt-table .modifier">
          <tbody>
            <tr>
              <td />
              <td>{HASH_ALGORITHMS[getCurrentAlgorithm()].name}(</td>
            </tr>
            <tr>
              <td><strong>Parent Hash</strong></td>
              <td>
                <textarea
                  className="pt-input"
                  spellCheck={false}
                  style={{ width: "150px", height: "75px" }}
                  value={this.props.block.parentHash}
                  readOnly
                />
              </td>
              <td style={{}}>Locked to parent block</td>
            </tr>
            <tr>
              <td />
              <td>+</td>
            </tr>
            <tr>
              <td><strong>Reward To</strong></td>
              <td>
                <Key value={this.props.block.coinbaseBeneficiary} />
              </td>
              <td style={{}}>Your public key (receives 10 coins)</td>
            </tr>
            <tr>
              <td />
              <td>+</td>
            </tr>
            <tr>
              <td><strong>Transactions</strong></td>
              <td>
                <textarea
                  className="pt-input"
                  spellCheck={false}
                  style={{ width: "150px", height: "75px" }}
                  value={this.props.block.combinedTransactionsHash()}
                  readOnly
                />
              </td>
              <td>
                Combined hash of all transactions
              </td>
            </tr>
            <tr>
              <td />
              <td>+</td>
            </tr>
            <tr>
              <td><strong>Nonce</strong></td>
              <td>
                <textarea
                  className="pt-input"
                  spellCheck={false}
                  style={{ width: "150px", height: "75px" }}
                  value={this.props.block.nonce}
                  onChange={this.changeNonce}
                  title="Change this value to find a valid hash (ending in zeros). Use brute-force mining to automatically find one!"
                />
              </td>
              <td>
                Try values or <Button onClick={this.tryUntilFound} className="pt-intent-success">Auto-Mine</Button>
              </td>
            </tr>
            <tr>
              <td />
              <td>) =</td>
            </tr>
            <tr>
              <td><strong>Result Hash</strong></td>
              <td>
                <textarea
                  className={classnames("pt-input", {
                    "pt-intent-danger": !this.props.block.isValid(),
                    "pt-intent-success": this.props.block.isValid()
                  })}
                  spellCheck={false}
                  style={{ width: "150px", height: "75px" }}
                  value={this.props.block.hash}
                  readOnly
                />
              </td>
              <td>
                {this.props.block.isValid() && (
                  <span>Valid! Ends with 00</span>
                )}
                {!this.props.block.isValid() && (
                  <span>Invalid - needs to end in 00</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
