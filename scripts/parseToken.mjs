import * as core from '@actions/core';

(async () => {
  try {
    const token = JSON.parse(process.env.RESOLVED_TOKEN_STR);
    const { prealphaEnv, chainId, address, name, symbol, decimals, logoURI } =
      token;
    const newtoken = {
      chainId: parseInt(chainId),
      address,
      name,
      symbol,
      decimals: parseInt(decimals),
      logoURI,
    };
    core.setOutput('prealpha-env', prealphaEnv);
    core.setOutput('new-token', JSON.stringify(newtoken, null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
