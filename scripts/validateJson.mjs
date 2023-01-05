import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readJson } from './util.mjs';

async function validate() {
  const ajv = new Ajv({ allErrors: true, verbose: true });
  addFormats(ajv);
  const schema = await readJson('../tokenlist.schema.json');
  const validator = ajv.compile(schema);
  const tokenList = await readJson('../scroll.tokenlist.json');
  const valid = validator(tokenList);
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
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
