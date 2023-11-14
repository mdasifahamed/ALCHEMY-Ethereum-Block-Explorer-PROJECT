import { Alchemy, Network,Utils } from 'alchemy-sdk';
const settings = {
  apiKey: process.evn.Alchemy_APIKEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export { alchemy }