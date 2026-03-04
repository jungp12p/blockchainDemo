import React, { Component } from "react";
import { Icon } from "@blueprintjs/core";
import Key from "./Key";
import { state } from "../store";
import UTXOPoolTable from "./UTXOPoolTable";
import AddIdentity from "./AddIdentity";
import Signature from "./Signature";
export default class NewTransaction extends Component {
  static defaultProps = {
    transaction: null,
    block: null,
    onChangeInputPublicKey: () => {},
    onChangeOutputPublicKey: () => {},
    onChangeTransactionAmount: () => {},
    onChangeFee: () => {},
    onChangeSignature: () => {}
  };
  onChangeSignature = signature => {
    this.props.onChangeSignature(signature);
  };
  onChangeOutputPublicKey = outputPublicKey => {
    this.props.onChangeOutputPublicKey(outputPublicKey);
  };
  onChangeFee = fee => {
    this.props.onChangeFee(fee);
  };
  onChangeTransactionAmount = amount => {
    this.props.onChangeTransactionAmount(amount);
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Tx Hash</th>
            <th>From (Sender)</th>
            <th />
            <th>To (Receiver)</th>
            <th>Amount</th>
            <th>Fee</th>
            <th>Signature</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <textarea
                className="pt-input"
                spellCheck={false}
                style={{ width: "150px", height: "75px" }}
                value={this.props.transaction.hash}
                readOnly
              />
            </td>
            <td>
              <Key
                value={this.props.transaction.inputPublicKey}
                onChange={this.props.onChangeInputPublicKey}
                readOnly={false}
                tooltipText="Select sender's public key"
                popover={
                  <div style={{ padding: "10px" }}>
                    <h6>Available UTXOs</h6>
                    <UTXOPoolTable
                      block={this.props.block}
                      onSelectRow={utxo =>
                        this.props.onChangeInputPublicKey(utxo.publicKey)
                      }
                    />
                  </div>
                }
              />
            </td>
            <td>
              <Icon iconName="pt-icon-arrow-right" />
            </td>
            <td>
              <Key
                value={this.props.transaction.outputPublicKey}
                onChange={this.onChangeOutputPublicKey}
                readOnly={false}
                tooltipText="Select receiver's public key"
                popover={
                  <div style={{ padding: "10px" }}>
                    <h6>Your Identities</h6>
                    {Object.values(state.identities).map(identity => {
                      return (
                        <a
                          key={identity.publicKey}
                          onClick={() =>
                            this.onChangeOutputPublicKey(identity.publicKey)
                          }
                        >
                          <li>{identity.name}</li>
                        </a>
                      );
                    })}
                    <AddIdentity />
                  </div>
                }
              />
            </td>
            <td>
              <input
                style={{
                  height: "75px",
                  width: "75px",
                  fontSize: "34px",
                  textAlign: "center"
                }}
                type="number"
                onChange={this.onChangeTransactionAmount}
                value={this.props.transaction.amount}
                title="How many coins to send"
              />
            </td>
            <td>
              <input
                style={{
                  height: "75px",
                  width: "75px",
                  fontSize: "34px",
                  textAlign: "center"
                }}
                type="number"
                onChange={this.onChangeFee}
                value={this.props.transaction.fee}
                title="Fee paid to miner - higher fees get priority!"
              />
            </td>
            <td>
              <Signature
                signature={this.props.transaction.signature}
                messageToSign={this.props.transaction.hash}
                publicKey={this.props.transaction.inputPublicKey}
                onChangeSignature={this.onChangeSignature}
                title="Sign with your private key to prove ownership"
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
