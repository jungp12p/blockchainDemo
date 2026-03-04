import React, { Component } from "react";
import Key from "./Key";
import { Tab2, Tabs2, EditableText } from "@blueprintjs/core";
import { action } from "../store"
export default class IdentityListItem extends Component {
  changeName = (name) => {
    action({type: 'CHANGE_IDENTITY_NAME', publicKey: this.props.identity.publicKey, name })
  }
  changeInitialCoins = (initialCoins) => {
    const coins = parseInt(initialCoins, 10) || 0;
    action({type: 'CHANGE_IDENTITY_INITIAL_COINS', publicKey: this.props.identity.publicKey, initialCoins: coins})
  }
  render() {
    return (
      <div style={{marginBottom: '10px'}}>
        <h6><EditableText value={this.props.identity.name} onChange={this.changeName}/></h6>
        <div style={{marginBottom: '10px'}}>
          <label>
            <strong>Initial Coins:</strong>
            <input
              type="number"
              min="0"
              value={this.props.identity.initialCoins || 0}
              onChange={(evt) => this.changeInitialCoins(evt.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '80px' }}
            />
          </label>
        </div>
        <Tabs2>
          <Tab2
            id="public"
            title="Public Key"
            panel={<Key value={this.props.identity.publicKey} />}
          />
          <Tab2
            id="private"
            title="Private Key"
            panel={
              <textarea
                className="pt-input"
                spellCheck={false}
                style={{ width: "100%", height: "100px" }}
                value={this.props.identity.privateKey}
                readOnly
              />
            }
          />
        </Tabs2>
      </div>
    );
  }
}
