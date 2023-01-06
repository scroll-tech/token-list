import * as core from '@actions/core';
import { writeFile } from 'fs/promises';
import { readJson, generatePath } from './util.mjs';

(async () => {
  try {
    const tokenStr = core.getInput('token');
    const tokenList = await readJson('../scroll.tokenlist.json');

    tokenList.tokens.push(JSON.parse(tokenStr));
    tokenList.timestamp = new Date().toISOString();
    const tokenListStr = JSON.stringify(tokenList, null, 2);

    await writeFile(generatePath('../scroll.tokenlist.json'), tokenListStr);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
