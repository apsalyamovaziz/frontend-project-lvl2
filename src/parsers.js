import path from 'path';
import yaml from 'js-yaml';

const getPath = (file) => path.resolve(process.cwd(), file);

const parser = (file) => {
  if (path.extname(getPath(file)) === 'json') {
    return JSON.parse();
  }
  if (path.extname(getPath(file)) === 'yml') {
    return yaml.safeLoad();
  }
}

export default parser;