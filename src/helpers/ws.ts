import { WebSocketProvider } from '@ethersproject/providers';
import config from '@/helpers/config';

let provider;
const chainId = '56';
const url: any = config.networks[chainId].ws_url;
if (url) provider = new WebSocketProvider(url);

export default provider;
