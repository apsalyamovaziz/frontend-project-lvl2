import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFile = (fileName) => fs.readFileSync(getPath(fileName), { encoding: 'utf-8' });

const parse = (file) => {
  if (path.extname(getPath(file)) === '.json') {
    return JSON.parse(readFile(file));
  }
  if (path.extname(getPath(file)) === '.yml') {
    return yaml.safeLoad(readFile(file));
  }
  return undefined;
};

export default parse;
