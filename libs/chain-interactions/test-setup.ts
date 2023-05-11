// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fclConfig from '@onflow/fcl-config';
import { resolve } from 'path';

fclConfig.flowConfig = () => {
  console.log(resolve(__dirname, './flow.json'));
  return resolve(__dirname, './flow.json');
};

jest.setTimeout(100000);
