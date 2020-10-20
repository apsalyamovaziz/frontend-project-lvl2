/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-duplicates */

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('testt', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const result = gendiff(filePath1, filePath2);
  const expectedResult = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
  }`;

  expect(result).toEqual(expectedResult);
});
