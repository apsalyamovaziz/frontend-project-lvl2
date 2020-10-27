import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filename1, filename2) => {
  const file1 = parse(filename1);
  const file2 = parse(filename2);
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

export default genDiff;
