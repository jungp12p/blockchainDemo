import { hash } from "../hash";
import UTXOPool from "./UTXOPool";
import { map } from "ramda";
import { transactionFromJSON } from "./Transaction";
import { getDifficulty } from "../store";

class Block {
  constructor(opts) {
    const {
      blockchain,
      parentHash,
      height,
      coinbaseBeneficiary,
      nonce,
      utxoPool,
      transactions
    } = {
      coinbaseBeneficiary: "root",
      nonce: "",
      utxoPool: new UTXOPool(),
      transactions: {},
      ...opts
    };
    this.blockchain = blockchain;
    this.nonce = nonce;
    this.parentHash = parentHash;
    this.height = height;
    this.coinbaseBeneficiary = coinbaseBeneficiary;
    this.utxoPool = utxoPool;
    this.transactions = map(transactionFromJSON)(transactions);
    this._setHash();
    // for visualization purposes
    this.expanded = true;
  }

  isRoot() {
    return this.parentHash === "root";
  }
  isValid() {
    const difficulty = getDifficulty();
    return (
      this.isRoot() ||
      (this.hash.substr(-difficulty) === "0".repeat(difficulty) &&
        this.hash === this._calculateHash())
    );
  }

  createChild(coinbaseBeneficiary) {
    const block = new Block({
      blockchain: this.blockchain,
      parentHash: this.hash,
      height: this.height + 1,
      utxoPool: this.utxoPool.clone(),
      coinbaseBeneficiary
    });

    return block;
  }

  addTransaction(transaction) {
    if (!this.isValidTransaction(transaction)) return;
    this.transactions[transaction.hash] = transaction;
    this.utxoPool.handleTransaction(transaction, this.coinbaseBeneficiary);
    this._setHash();
  }

  isValidTransaction(transaction) {
    return (
      this.utxoPool.isValidTransaction(transaction) &&
      transaction.hasValidSignature()
    );
  }

  addingTransactionErrorMessage(transaction) {
    if (!transaction.hasValidSignature()) return "Signature is not valid";
    return this.utxoPool.addingTransactionErrorMessage(transaction);
  }

  setNonce(nonce) {
    this.nonce = nonce;
    this._setHash();
  }

  combinedTransactionsHash() {
    if (Object.values(this.transactions).length === 0)
      return "No Transactions in Block";
    return hash(
      Object.values(this.transactions)
        .map(tx => tx.hash)
        .join("")
    );
  }

  toJSON() {
    return {
      hash: this.hash,
      nonce: this.nonce,
      parentHash: this.parentHash,
      height: this.height,
      coinbaseBeneficiary: this.coinbaseBeneficiary,
      transactions: map(transaction => transaction.toJSON(), this.transactions)
    };
  }

  _setHash() {
    this.hash = this._calculateHash();
  }

  _calculateHash() {
    return hash(
      this.nonce +
        this.parentHash +
        this.coinbaseBeneficiary +
        this.combinedTransactionsHash()
    );
  }
}

export default Block;

export function blockFromJSON(blockchain, data) {
  return new Block({
    ...data,
    blockchain
  });
}
