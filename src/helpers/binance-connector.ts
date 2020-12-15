import { BscConnector } from '@binance-chain/bsc-connector';
import LockConnector from '@snapshot-labs/lock/src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      const connector = new BscConnector({ supportedChainIds: [56] });
      provider = await connector.getProvider();
      await provider.enable();
    } catch (e) {
      console.error(e);
      return;
    }
    return provider;
  }
}
