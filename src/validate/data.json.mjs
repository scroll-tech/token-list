import assert from 'node:assert'
import { isObject, noDuplicateStringInArray } from './helper.mjs'
import { getAddress } from 'ethers'

import { NETWORK_DATA } from '../chains.mjs'

function validateGlobalKeys(dataDotJsonObject) {
  const GLOBAL_KEYS = ['name', 'symbol', 'decimals', 'tokens']

  const keys = Object.keys(dataDotJsonObject)

  // prettier-ignore
  {
    // no duplicate keys
    assert(noDuplicateStringInArray(keys), `found duplicate key, expected keys ${GLOBAL_KEYS.toString()}`)

    // name
    assert.equal(typeof dataDotJsonObject.name, 'string', 'expect name to be a string')
    // symbol
    assert.equal(typeof dataDotJsonObject.symbol, 'string', 'expect symbol to be a string')
    // decimals
    assert(Number.isInteger(dataDotJsonObject.decimals), 'expect decimal to be a string')
    // tokens
    assert(isObject(dataDotJsonObject.tokens), 'expect tokens to be a map')
  }
}

function validateName() {}

function validateSymbol() {}

function validateDecimals(decimals) {
  assert(decimals > 0, 'invalid decimals, must > 0')
  assert(decimals <= 18, 'invalid decimals, must <= 18')
}

function validateTokens(tokens) {
  const CHAIN_NAMES = Object.keys(NETWORK_DATA)
  const keys = Object.keys(tokens)

  // prettier-ignore
  {
    assert(noDuplicateStringInArray(keys), `found duplicate key, expected keys ${CHAIN_NAMES.toString()}`)
    assert(keys.every((key) => CHAIN_NAMES.includes(key)), `found invalid keys, expected keys ${CHAIN_NAMES.toString()}`)
  }
}

function validateToken([_chainName, token]) {
  const TOKEN_KEYS = ['address']
  const keys = Object.keys(token)

  // prettier-ignore
  {
    assert(noDuplicateStringInArray(keys), `found duplicate key, expected keys ${TOKEN_KEYS.toString()}`)
    assert(keys.every((key) => TOKEN_KEYS.includes(key)), `found invalid keys, expected keys ${TOKEN_KEYS.toString()}`)
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
  assert.equal(tokenFolderName, symbol, 'require token symbol = token folder name')
  validateName(name)
  validateSymbol(symbol)
  validateDecimals(decimals)
  validateTokens(tokens)
  Object.entries(tokens).forEach((token) => validateToken(token))
}
