import React, { useRef, useEffect, useContext, useState } from 'react';
import { useAccountBookData } from '../../../store/AccountBook/accountBookInfoHook';
import { useDefaultPaymentData } from '../../../store/PaymentMethod/paymentMethodHook';

import { createPaymentMethod } from '../../../api/payment-method';
import { ResponseMessage } from '../../../util/message';
import './addForm.scss';

interface Card {
  setAddFormModal: (data: boolean) => void;
}

export default function AddTemplate({
  setAddFormModal,
}: Card): React.ReactElement {
  const [methodNick, setMethodNick] = useState('');
  const methodInput = useRef();

  const addTemplateData = useDefaultPaymentData(store => store.addTemplateData);
  const updateAddTemplate = useDefaultPaymentData(
    store => store.updateAddTemplate,
  );

  const addPaymentMethod = useAccountBookData(store => store.addPaymentMethod);
  const accountBookId = useAccountBookData(store => store.accountBook._id);

  const onChangeNick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethodNick(event.target.value);
  };

  const onAddCard = async event => {
    if (event.key === 'Enter') {
      try {
        const res = await createPaymentMethod({
          accountBookId,
          name: addTemplateData.name,
          desc: `${methodNick}`,
          color: addTemplateData.color,
        });
        if (res.status !== ResponseMessage.success) {
          throw new Error();
        }
        addPaymentMethod(res.data);

        setAddFormModal(() => false);
        updateAddTemplate({ name: '', color: '' });
        setMethodNick(() => '');
      } catch (error) {
        throw new Error();
      }
    }
  };

  useEffect(() => {
    if (addTemplateData.name) {
      methodInput.current.focus();
    }
  });

  return (
    <div
      className={
        addTemplateData.name.length === 0
          ? 'addform__wrapper'
          : 'addform__wrapper selected'
      }
      style={{ background: `${addTemplateData.color}` }}
    >
      {addTemplateData.name || '아래에서 카드를 선택해주세요.'}
      {addTemplateData.name && (
        <input
          ref={methodInput}
          value={methodNick}
          className="addform__method__name"
          type="text"
          placeholder="Enter Method Nickname"
          onChange={onChangeNick}
          onKeyPress={onAddCard}
        />
      )}
    </div>
  );
}
