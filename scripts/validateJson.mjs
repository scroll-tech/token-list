import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFile } from 'fs/promises';

async function validate() {
  const ajv = new Ajv({ allErrors: true, verbose: true });
  addFormats(ajv);
  const schema = await readFile(
    new URL('../tokenlist.schema.json', import.meta.url)
  );
  const validator = ajv.compile(JSON.parse(schema));
  const tokenList = await readFile(
    new URL('../scroll.tokenlist.json', import.meta.url)
  );
  const valid = validator(JSON.parse(tokenList));
  if (valid) {
    return valid;
  }
  if (validator.errors) {
    throw validator.errors.map((error) => {
      delete error.data;
      return error;
    });
  }
}

validate()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
