
import _ from 'lodash'
import fs from 'fs';
import pkg from 'lodash';
const { has } = pkg;


const getDiff = (file1, file2) => {
    const readData1 = fs.readFileSync(file1)
    const readData2 = fs.readFileSync(file2);
    
    const obj1 = JSON.parse(readData1);
    const obj2 = JSON.parse(readData2);

    const key1 = _.keys(obj1);
    const key2 = _.keys(obj2);
    const keys = _.union(key1, key2);
    const sortedKeys = keys.sort()
    const diffFunc = sortedKeys.reduce((acc, key) => {
        if(has(obj1, key)) {
          if (has(obj2, key)) {
            if(obj1[key] !== obj2[key]) {
              acc[`- ${key}`] = obj1[key]
              acc[`+ ${key}`] = obj2[key]
            } else {
              acc[key] = obj1[key]
            }
          } else {
            acc[`- ${key}`] = obj1[key]
          }
        } else {
          if (has(obj2, key)) {
            acc[`+ ${key}`] = obj2[key]
          }
        }    
        return acc;
      }, {})

    return diffFunc
};

export default getDiff;