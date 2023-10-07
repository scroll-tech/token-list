import fs from 'fs'
import path from 'path'

import { glob } from 'glob'

import packageJson from '../package.json' assert { type: 'json' }
import { NETWORK_DATA } from './chains.mjs'
import { defaultTokenDataFolders } from './defaultTokens.mjs'

const version = packageJson.version

const BASE_URL = 'https://scroll-tech.github.io/token-list'
const datadir = 'data'

export function generate() {
  return fs
    .readdirSync(datadir)
    .sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase())
    })
    .map((folder) => {
      const data = JSON.parse(
        fs.readFileSync(path.join(datadir, folder, 'data.json'), 'utf8')
      )
      const logofiles = glob.sync(
        `${path.join(datadir, folder)}/logo.{png,svg}`
      )
      const logoext = logofiles[0].endsWith('png') ? 'png' : 'svg'
      return Object.entries(data.tokens).map(([chain, token]) => {
        // const bridges = !data.nobridge
        //   ? Object.assign({}, ...getBridges(data, chain, token))
        //   : {}
        const out = {
          chainId: NETWORK_DATA[chain].id,
          address: token.address,
          name: token.overrides?.name ?? data.name,
          symbol: token.overrides?.symbol ?? data.symbol,
          decimals: token.overrides?.decimals ?? data.decimals,
          logoURI: `${BASE_URL}/data/${folder}/logo.${logoext}`,
          extensions: {
            // ...bridges,
            scrollListId: defaultTokenDataFolders.has(folder)
              ? 'default'
              : 'extended',
            scrollTokenId: folder,
          },
        }
        return out
      })
    })
    .reduce(
      (list, tokens) => {
        list.tokens = list.tokens.concat(tokens)
        return list
      },
      {
        name: 'Scroll Token List',
        logoURI: `${BASE_URL}/scroll.png`,
        keywords: ['scaling', 'layer2', 'infrastructure'],
        timestamp: new Date().toISOString(),
        tokens: [],
        version: {
          major: parseInt(version.split('.')[0], 10),
          minor: parseInt(version.split('.')[1], 10),
          patch: parseInt(version.split('.')[2], 10),
        },
      }
    )
}
