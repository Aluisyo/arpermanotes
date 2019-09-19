import React, { useState } from 'react';
import { Modal, Input, Select, InputNumber, message } from 'antd';
import { addTransaction } from '../api';

const AddTransaction = ({ visible, closeModal, wallet }) => {
  const [coinName, setCoinName] = useState('');
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('BUY');
  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    if (!coinName || !amount || !transactionType) {
      return;
    }
    if (isNaN(amount)) {
      return;
    }

    const transaction = { coinName, amount, transactionType };
    try {
      setLoading(true);
      await addTransaction(transaction, wallet);
      resetState();
      closeModal();
    } catch (e) {
      console.log(e);
      message.error(`something went wrong, please try again.`);
    }
  };

  const resetState = () => {
    setLoading(false);
    setCoinName('');
    setAmount(0);
    setTransactionType('BUY');
  };

  return (
    <Modal
      visible={visible}
      onOk={submitForm}
      onCancel={() => closeModal(null)}
      confirmLoading={loading}
    >
      <Input
        type="text"
        placeholder="Coin Name"
        onChange={event => setCoinName(event.target.value)}
        name="coin-name"
        required
        value={coinName}
      />
      <InputNumber
        placeholder="Amount"
        onChange={value => {
          if (typeof value === 'number') setAmount(value);
        }}
        name="rate"
        required
        value={amount}
      />
      <Select
        style={{ width: 70 }}
        name="transaction-type"
        onChange={value => setTransactionType(value)}
        required
        defaultValue={transactionType}
      >
        <Select.Option value="BUY">BUY</Select.Option>
        <Select.Option value="SELL">SELL</Select.Option>
      </Select>
    </Modal>
  );
};

export default AddTransaction;
