/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useObserver } from 'mobx-react-lite';
import { paymentContext } from '../../../store/PaymentMethod/paymentMethodContext';

import styles from './addForm.module.scss';

interface Card {
  name: string;
  color: string;
  methodNick: string;
  setMethodNick: (data: string) => void;
  paymentMethodData: object[];
  setPaymentMethodData: (data: object) => void;
  setAddForm: (data: boolean) => void;
  setAddData: (data: object) => void;
}

export default function AddTemplate({
  name,
  color,
  setMethodNick,
  methodNick,
  setAddForm,
  setAddData,
}: Card): React.ReactElement {
  const methodInput = useRef();
  const store = useContext(paymentContext);

  const onChangeNick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethodNick(event.target.value);
  };

  const onAddCard = event => {
    if (event.key === 'Enter') {
      store?.addPaymentMethod({
        name,
        desc: `${methodNick}`,
        color,
      });

      setAddForm(() => false);
      setAddData(() => {
        return { name: '', color: '' };
      });
      setMethodNick(() => '');
    }
  };

  useEffect(() => {
    if (name) {
      methodInput.current.focus();
    }
  });

  return (
    <div className={styles.wrapper} style={{ background: `${color}` }}>
      {name || '아래에서 카드를 선택해주세요.'}
      {name && (
        <input
          ref={methodInput}
          value={methodNick}
          className={styles.methodName}
          type="text"
          placeholder="Enter Method Nickname"
          onChange={onChangeNick}
          onKeyPress={onAddCard}
        />
      )}
    </div>
  );
}
