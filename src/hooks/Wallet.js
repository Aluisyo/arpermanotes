import { useState } from 'react';
import { getWalletAddress } from '../api';

const Wallet = () => {
  const [walletKey, setWalletKey] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  const setWallet = async wallet => {
    setWalletKey(wallet);
    setWalletAddress(await getWalletAddress(wallet));
  };

  return [{ wallet: walletKey, walletAddress }, setWallet];
};

export default Wallet;
