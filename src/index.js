import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getFixturePath = (file) => path.join(process.cwd(), file);

const getDiff = (file1, file2) => {
  const filePath1 = getFixturePath(file1);
  const filePath2 = getFixturePath(file2);

  const readData1 = fs.readFileSync(filePath1);
  const readData2 = fs.readFileSync(filePath2);

  const obj1 = JSON.parse(readData1);
  const obj2 = JSON.parse(readData2);


  const key1 = _.keys(obj1);
  const key2 = _.keys(obj2);
  const keys = _.union(key1, key2);
  const sortedKeys = keys.sort();
  const diffFunc = sortedKeys.reduce((acc, key) => {
    if (_.has(obj1, key)) {
      if (_.has(obj2, key)) {
        if (obj1[key] !== obj2[key]) {
          acc[`- ${key}`] = obj1[key];
          acc[`+ ${key}`] = obj2[key];
        } else {
          acc[key] = obj1[key];
        }
      } else {
        acc[`- ${key}`] = obj1[key];
      }
    } else if (_.has(obj2, key)) {
      acc[`+ ${key}`] = obj2[key];
    }
    return acc;
  }, {});
  return diffFunc;
};

export default getDiff;
