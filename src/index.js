import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parser from '../src/parsers.js'

const getFixturePath = (file) => path.resolve(process.cwd(), file);

const genDiff = (filename1, filename2) => {
  const filePath1 = getFixturePath(filename1);
  const filePath2 = getFixturePath(filename2);
  /* cosnole.log(filePath1) */
  /* cosnole.log(filename2) */
  const file1 = parser(fs.readFileSync(filePath1, { encoding: 'utf-8' }));
  const file2 = parser(fs.readFileSync(filePath2, { encoding: 'utf-8' }));
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const keys = _.union(keys1, keys2).sort();
  const result = ['{\n'];
  const added = '    + ';
  const deleted = '    - ';
  const unchanged = '      ';
  keys.forEach((key) => {
    if (!_.has(file1, key)) {
      result.push(added, key, ': ', String(file2[key]), '\n');
    } else if (!_.has(file2, key)) {
      result.push(deleted, key, ': ', String(file1[key]), '\n');
    } else if (file1[key] !== file2[key]) {
      result.push(deleted, key, ': ', String(file1[key]), '\n');
      result.push(added, key, ': ', String(file2[key]), '\n');
    } else {
      result.push(unchanged, key, ': ', String(file1[key]), '\n');
    }
  });
  result.push('  }');
  return result.join('');
};

/* console.log('test console.log') */

export default genDiff;
