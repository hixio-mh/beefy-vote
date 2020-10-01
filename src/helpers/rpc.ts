import { JsonRpcProvider } from '@ethersproject/providers';
import config from '@/helpers/config';

const chainId = '56';
const url: any = config.networks[chainId].rpc_url;
const provider = new JsonRpcProvider(url);

export default provider;
