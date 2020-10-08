import pkg from 'lodash';
const { has } = pkg;
import fs from 'fs';


const diff = (file1, file2) => {
    const result = {};

    const readData1 = fs.readFileSync(file1)
    const readData2 = fs.readFileSync(file2);

    const data1 = JSON.parse(readData1);
    const data2 = JSON.parse(readData2);
  
    Object.keys(data2).forEach((key) => {
      if (has(data1, key)) {
        if (data2[key] === data1[key]) {
          result[key] = data1[key];
        } else {
          result[`- ${key}`] = data1[key];
          result[`+ ${key}`] = data2[key];
        }
      } else {
        result[`+ ${key}`] = data2[key];
      }
    });
  
    Object.keys(data1).forEach((key) => {
      if (!has(data2, key)) {
        result[`- ${key}`] = data1[key];
      }
    });
  
    return result;
  };
  
  export default diff;