import pinataSDK from '@pinata/sdk';

import { APP } from '../constants';

export const getFileData = async (hash) => {
  const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);

  const { file } = await response.json();

  return file;
};

export const uploadFileData = async (fileData) => {
  const pinata = pinataSDK(APP.PINATA_API_KEY, APP.PINATA_API_SECRET);
  const metadata = {};
  const data = {
    file: fileData,
  };

  const result = await pinata.pinJSONToIPFS(data, metadata);

  return result.IpfsHash;
};