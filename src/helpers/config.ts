import config from '@/config.json';

config.env = 'master';
const domainName = window.location.hostname;
if (domainName.includes('localhost')) config.env = 'local';

export default config;
