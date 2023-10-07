import fs from 'fs'
import {validate as validateDataDotJson} from './validate/data.json.mjs'
import {validate as validateLogo} from './validate/logo.mjs'

function readDataDotJson(tokenName) {
  try {
    JSON.parse(fs.readFileSync(`./data/${tokenName}/data.json`))
    return JSON.parse(fs.readFileSync(`./data/${tokenName}/data.json`))
  } catch (err) {
    console.error(err)
    throw new Error(`unable to parse data.json for token ${tokenName}`)
  }
}

export async function validate(tokenFolders) {
  console.info(`
# validation start
`)
  console.info(`validate folders ${tokenFolders}`)
  const tokenData = tokenFolders.map((name) => ({
    name,
    json: readDataDotJson(name),
  }))

  for (const { name, json } of tokenData) {
    await validateDataDotJson(name, json)
    await validateLogo(name)
  }
  console.info(`
# validation end
`)
}
