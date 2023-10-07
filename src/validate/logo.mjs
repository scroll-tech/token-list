import assert from 'node:assert'
import fs from 'fs'

function exits(tokenFolderName) {
  assert(
    fs.existsSync(`./data/${tokenFolderName}/logo.svg`) ||
      fs.existsSync(`./data/${tokenFolderName}/logo.png`),
    `Missing logo for token ${tokenFolderName}`
  )
}

export async function validate(tokenFolderName) {
  console.info(`
## validating ${tokenFolderName} logo`)
  exits(tokenFolderName)
}
