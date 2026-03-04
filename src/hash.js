import SHA256 from "crypto-js/sha256";
import SHA512 from "crypto-js/sha512";
import SHA1 from "crypto-js/sha1";
import SHA3 from "crypto-js/sha3";
import MD5 from "crypto-js/md5";

// Available hash algorithms
export const HASH_ALGORITHMS = {
  SHA256: { name: 'SHA-256', fn: SHA256, description: 'Industry standard, Bitcoin default' },
  SHA512: { name: 'SHA-512', fn: SHA512, description: 'Stronger but slower' },
  SHA1: { name: 'SHA-1', fn: SHA1, description: 'Deprecated - educational only' },
  SHA3: { name: 'SHA-3', fn: SHA3, description: 'Latest standard (Keccak)' },
  MD5: { name: 'MD5', fn: MD5, description: 'Very weak - educational only' }
};

// Default algorithm
let currentAlgorithm = 'SHA256';

/**
 * Set the current hash algorithm
 * @param {string} algorithm - Key from HASH_ALGORITHMS
 */
export function setHashAlgorithm(algorithm) {
  if (HASH_ALGORITHMS[algorithm]) {
    currentAlgorithm = algorithm;
  } else {
    console.warn(`Unknown algorithm: ${algorithm}, using SHA256`);
    currentAlgorithm = 'SHA256';
  }
}

/**
 * Get the current hash algorithm name
 * @returns {string}
 */
export function getCurrentAlgorithm() {
  return currentAlgorithm;
}

/**
 * Hash data using the currently selected algorithm
 * @param {string} data - Data to hash
 * @returns {string} - Hex string of hash
 */
export function hash(data) {
  const algorithm = HASH_ALGORITHMS[currentAlgorithm];
  return algorithm.fn(data).toString();
}

/**
 * Hash data using a specific algorithm (without changing the global setting)
 * @param {string} data - Data to hash
 * @param {string} algorithm - Algorithm key
 * @returns {string} - Hex string of hash
 */
export function hashWith(data, algorithm) {
  const algo = HASH_ALGORITHMS[algorithm] || HASH_ALGORITHMS.SHA256;
  return algo.fn(data).toString();
}
