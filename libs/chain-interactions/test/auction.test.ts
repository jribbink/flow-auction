import {
  deployContract,
  deployContractByName,
  emulator,
  getAccountAddress,
  init,
  shallPass,
  // @ts-ignore
} from 'fjs-testing-fork';
import { resolve } from 'path';
import { cwd } from 'process';

console.log(cwd());

describe('Auction tests', () => {
  beforeEach(async () => {
    const basePath = resolve(__dirname, '../cadence');

    await init(basePath);
    await emulator.start();
  });

  test('Deploy contract', async () => {
    const address = await getAccountAddress('Alice');
    await shallPass(
      deployContractByName({
        name: 'FlowAuction',
        to: address,
      })
    );
  });

  afterEach(async () => {
    await emulator.stop();
  });
});
