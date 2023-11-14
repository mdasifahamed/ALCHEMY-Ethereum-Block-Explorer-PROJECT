import { Alchemy, Network,Utils } from 'alchemy-sdk';
const settings = {
  apiKey: "-uea8OG1ttwbzvZW2DUuhA_QYYkn6zTA",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export { alchemy }