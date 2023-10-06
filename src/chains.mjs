export const NETWORK_DATA = {
  ethereum: {
    id: 1,
    name: 'Mainnet',
    // provider: new ethers.providers.InfuraProvider('homestead'),
    layer: 1,
  },
  goerli: {
    id: 5,
    name: 'Goerli',
    // provider: new ethers.providers.InfuraProvider('goerli'),
    layer: 1,
  },
  sepolia: {
    id: 11155111,
    name: 'Sepolia',
    // provider: new ethers.providers.StaticJsonRpcProvider(
    //   `https://sepolia.infura.io/v3/${DEFAULT_INFURA_KEY}`,
    //   11155111
    // ),
    layer: 1,
  },
  'scroll-sepolia': {
    id: 534351,
    name: 'Scroll Sepolia',
    layer: 2,
  },
  'scroll-goerli': {
    id: 534353,
    name: 'Scroll Goerli',
    layer: 2,
  },
}
