import { writeFile } from 'fs/promises';
import { readJson, generatePath } from './util.mjs';

(async () => {
  try {
    const token = JSON.parse(process.env.NEW_TOKEN);
    const tokenList = await readJson('../scroll.tokenlist.json');

    tokenList.tokens.push(token);
    tokenList.timestamp = new Date().toISOString();
    const tokenListStr = JSON.stringify(tokenList, null, 2);

    await writeFile(generatePath('../scroll.tokenlist.json'), tokenListStr);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
