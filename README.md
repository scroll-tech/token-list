# Scroll Token List

The Scroll Token List serves as a source of truth for services such as the Scroll Bridge UI.

## Adding a token to the list

### Create a folder for your token

Create a folder inside the [data folder](https://github.com/ethereum-optimism/ethereum-optimism.github.io/tree/master/data) with the same name as the symbol of the token you are trying to add. For example, if you are adding a token with the symbol "ETH" you must create a folder called ETH.

### Add a logo to your folder

Add a logo to the data folder you just created. Your logo MUST be an SVG called `logo.svg`. Your logo should be at least 200x200 pt minimum and 256x256 pt preferred.

### Create a data file

Add a file to your folder called `data.json` with the following format:

```json
{
  "name": "Token Name",
  "symbol": "SYMBOL",
  "decimals": 18,
  "description": "A multi-chain token",
  "website": "https://token.com",
  "twitter": "@token",
  "tokens": {
    "ethereum": {
      "address": "0x1234123412341234123412341234123412341234"
    },
    "scroll": {
      "address": "0x2345234523452345234523452345234523452345"
    },
    "goerli": {
      "address": "0x5678567856785678567856785678567856785678"
    },
    "scroll-goerli": {
      "address": "0x6789678967896789678967896789678967896789"
    }
  }
}
```

### Create a pull request

Open a [pull request](https://github.com/scroll-tech/token-list/pulls) with the changes that you've made. Please only add one token per pull request to simplify the review process. This means two new files inside one new folder. If you want to add multiple tokens, please open different PRs for each token.
