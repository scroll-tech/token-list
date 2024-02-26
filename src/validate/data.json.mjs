import assert from 'node:assert'
import { isObject, noDuplicateStringInArray, parseURL } from './helper.mjs'
import { getAddress } from 'ethers'
import winston from 'winston';

import { NETWORK_DATA } from '../chains.mjs'

// Create a logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
});

function validateGlobalKeys(dataDotJsonObject) {
  const GLOBAL_KEYS = [
    'name',
    'symbol',
    'decimals',
    'tokens',
    'description',
    'website',
    'twitter',
    // 'nobridge',
    // 'nonstandard',
  ]

  const keys = Object.keys(dataDotJsonObject)

  // prettier-ignore
  {
    // no duplicate keys
    assert(noDuplicateStringInArray(keys), `found duplicate key, expected keys ${GLOBAL_KEYS.toString()}`)
    // no invalid keys
    assert(keys.every((key) => GLOBAL_KEYS.includes(key)), `found invalid key, valid keys are ${GLOBAL_KEYS.toString()}`)

    // name
    assert.equal(typeof dataDotJsonObject.name, 'string', 'expect name to be a string')
    // symbol
    assert.equal(typeof dataDotJsonObject.symbol, 'string', 'expect symbol to be a string')
    // decimals
    assert(Number.isInteger(dataDotJsonObject.decimals), 'expect decimal to be a string')
    // tokens
    assert(isObject(dataDotJsonObject.tokens), 'expect tokens to be a map')

    // optional keys
    // description
    if (dataDotJsonObject.description)
      assert.equal(typeof dataDotJsonObject.description, 'string', 'expect description to be a string')
    if (dataDotJsonObject.description)
      assert(dataDotJsonObject.description.length < 1000, 'expect description to under 1000 characters')
    // website
    if (dataDotJsonObject.website)
      assert(parseURL(dataDotJsonObject.website), 'expect website to be a valid URL')
    // twitter
    if (dataDotJsonObject.twitter)
      assert(typeof dataDotJsonObject.twitter === 'string' && dataDotJsonObject.twitter.startsWith('@'), 'expect twitter to be a string starts with @')
    // nobridge
    if (dataDotJsonObject.nobridge !== undefined)
      assert(dataDotJsonObject.nobridge === true, 'expect nobridge to be true, omit nobridge if you want it to be false')
    // nonstandard
    if (dataDotJsonObject.nonstandard !== undefined)
      assert(dataDotJsonObject.nonstandard === true, 'expect nonstandard to be true, omit nobridge if you want it to be false')
  }
}

function validateName() { }

function validateSymbol() { }

function validateDecimals(decimals) {
  assert(decimals > 0, 'invalid decimals, must > 0')
  assert(decimals <= 18, 'invalid decimals, must <= 18')
}

function validateToken([_chainName, token]) {
  const TOKEN_KEYS = ['address']
  const keys = Object.keys(token)

  // prettier-ignore
  {
    assert(noDuplicateStringInArray(keys), `found duplicate key, valid keys are ${TOKEN_KEYS.toString()}`)
    assert(keys.every((key) => TOKEN_KEYS.includes(key)), `found invalid key, valid keys are ${TOKEN_KEYS.toString()}`)
  }

  try {
    getAddress(token.address)
  } catch (error) {
    logger.error(`Invalid address for token: ${token.address}`);
    // You might choose to throw an error here or handle it accordingly.
  }
}

function validateToken([_chainName, token]) {
  const TOKEN_KEYS = ['address']
  const keys = Object.keys(token)

  // prettier-ignore
  {
    assert(noDuplicateStringInArray(keys), `found duplicate key, valid keys are ${TOKEN_KEYS.toString()}`)
    assert(keys.every((key) => TOKEN_KEYS.includes(key)), `found invalid key, valid keys are ${TOKEN_KEYS.toString()}`)
  }

  getAddress(token.address)
}

export async function validate(tokenFolderName, dataDotJsonObject) {
  console.info(`
## validating ${tokenFolderName}
input data.json:
${JSON.stringify(dataDotJsonObject, null, 2)}`)

  assert(isObject, `invalid data.json`)
  validateGlobalKeys(dataDotJsonObject)

  const { name, symbol, decimals, tokens } = dataDotJsonObject
  // prettier-ignore

  Object.entries(tokens).forEach((token) => {
    try {
      validateToken(token);
    } catch (error) {
      logger.error(`Error validating token: ${error.message}`);
      // Handle the error, maybe skip the token or log a warning, depending on your use case.
    }
  });
  
  assert.equal(tokenFolderName, symbol, 'require token symbol = token folder name')
  validateName(name)
  validateSymbol(symbol)
  validateDecimals(decimals)
  validateTokens(tokens)
  Object.entries(tokens).forEach((token) => validateToken(token))
}
