import "./index.css";
import "@blueprintjs/core/dist/blueprint.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { any, find } from "ramda";
import Blockchain from "./models/Blockchain";
import { generatePair } from "./crypto";
import { setHashAlgorithm, getCurrentAlgorithm } from "./hash";

const defaultBlockchain = new Blockchain("Bitcoin");

function createIdentity() {
  const pair = generatePair();

  return {
    name: "Node " + pair.publicKey.substr(0, 10),
    initialCoins: 0,
    ...pair
  };
}

const identity = createIdentity();

const identities = {};
identities[identity.publicKey] = identity;

let state = {
  blockchains: [defaultBlockchain],
  selectedBlockchain: defaultBlockchain,
  identities: identities,
  node: identity,
  hashAlgorithm: getCurrentAlgorithm(),
  difficulty: 2
};

window.state = state;

// If prospective employers see this, I know very much that mutation of state in place is discouraged, but was done here for pedagogical reasons
const action = function(actionPayload) {
  console.log(actionPayload);
  switch (actionPayload.type) {
    case "PICK_BLOCKCHAIN":
      if (actionPayload.name === "") break;
      let blockchain = find(bc => bc.name === actionPayload.name)(
        state.blockchains
      );
      if (blockchain === undefined) {
        blockchain = new Blockchain(actionPayload.name, state.identities);
        state.blockchains.push(blockchain);
      }
      state.selectedBlockchain = blockchain;
      break;
    case "BLOCKCHAIN_BROADCAST":
      actionPayload.names.forEach(name => {
        if (!any(b => b.name === name)(state.blockchains)) {
          const blockchain = new Blockchain(name, state.identities);
          state.blockchains.push(blockchain);
        }
      });
      break;
    case "ADD_IDENTITY": {
      const identity = createIdentity();
      state.identities[identity.publicKey] = identity;
      break;
    }
    case "CHANGE_IDENTITY_NAME": {
      const identity = state.identities[actionPayload.publicKey];
      if (identity === undefined) break;
      identity.name = actionPayload.name;
      break;
    }
    case "CHANGE_IDENTITY_INITIAL_COINS": {
      const identity = state.identities[actionPayload.publicKey];
      if (identity === undefined) break;
      identity.initialCoins = Math.max(0, actionPayload.initialCoins);
      // Reinitialize the blockchain genesis block with new initial coins
      if (state.selectedBlockchain) {
        state.selectedBlockchain.initializeGenesisBlock(state.identities);
      }
      break;
    }

    case "CHANGE_HASH_ALGORITHM": {
      state.hashAlgorithm = actionPayload.algorithm;
      setHashAlgorithm(actionPayload.algorithm);
      break;
    }

    case "CHANGE_DIFFICULTY": {
      state.difficulty = Math.max(1, Math.min(10, actionPayload.difficulty));
      break;
    }

    case "RERENDER":
      // do nothing really
      break;
    default:
      break;
  }
  const component = ReactDOM.render(
    <App appState={state} />,
    document.getElementById("root")
  );
  component.forceUpdate();
};

export function rerender() {
  action({ type: "RERENDER" });
}

export function getDifficulty() {
  return state.difficulty;
}

export { action, state };
