import { readFile } from 'fs/promises';

export const generatePath = (path) => {
  return new URL(path, import.meta.url);
};

export const readJson = (path) => {
  return readFile(generatePath(path)).then((res) => JSON.parse(res));
};
