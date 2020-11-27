import Vue from 'vue';
import { LockPlugin } from '@snapshot-labs/lock/plugins/vue';
import injected from '@snapshot-labs/lock/connectors/injected';
import walletconnect from '@snapshot-labs/lock/connectors/walletconnect';

import config from '@/helpers/config';

const options: any = { connectors: [] };
const connectors = { injected, walletconnect };

Object.entries(config.connectors).forEach((connector: any) => {
  options.connectors.push({
    key: connector[0],
    connector: connectors[connector[0]],
    options: connector[1].options,
  });
});

Vue.use(LockPlugin, options);
