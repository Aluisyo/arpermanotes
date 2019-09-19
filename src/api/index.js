import arweave from './arweave';
import {currentUnixTime, getAppName} from './utils';

export const getWalletAddress = async wallet =>
    arweave.wallets.jwkToAddress(wallet);

export const getAllPortfolioTransactions = async walletAddress => {
    const query = {
        op: 'and',
        expr1: {
            op: 'equals',
            expr1: 'from',
            expr2: walletAddress
        },
        expr2: {
            op: 'equals',
            expr1: 'App-Name',
            expr2: getAppName()
        }
    };

    const txids = await arweave.arql(query);

    const transactions = await Promise.all(
        txids.map(txid => arweave.transactions.get(txid))
    );

    const stringifiedTransactions = await Promise.all(
        transactions.map(transaction =>
            transaction.get('data', {decode: true, string: true})
        )
    );
    console.log(stringifiedTransactions);
    return stringifiedTransactions;
};

export const addTransaction = async (transactionData, wallet) => {
    Object.assign(transactionData, {time: currentUnixTime()});

    const transaction = await arweave.createTransaction(
        {data: JSON.stringify(transactionData)},
        wallet
    );

    transaction.addTag('Coin-Name', transactionData.coinName);
    transaction.addTag('Amount', transactionData.amount);
    transaction.addTag('Transaction-Type', transactionData.TransactionType);
    transaction.addTag('Time', transactionData.time);
    transaction.addTag('App-Name', getAppName());

    await arweave.transactions.sign(transaction, wallet);
    await arweave.transactions.post(transaction);
    return;
};


export const upload = async (file,YOURTEXT, YOURTEXT2, wallet) => {
   const transaction = await arweave.createTransaction(
{data: JSON.stringify({ph1loto: file, text: YOURTEXT, text2: YOURTEXT2})},
wallet
);
  

    transaction.addTag('App-Name', getAppName());

    await arweave.transactions.sign(transaction, wallet);
    await arweave.transactions.post(transaction);

    return true;
};
