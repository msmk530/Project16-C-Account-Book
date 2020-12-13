import React, { useState, useEffect } from 'react';

import { useAccountBookData } from '../../../store/AccountBook/accountBookInfoHook';

import DayRadioButton from './DayRadioButton';
import WeekHeader from './WeekHeader';
import ActionButton from '../../Common/ActionButton';

import { updateStartDay } from '../../../api/calendar-startday';
import './calendarSetting.scss';

export default function CalendarSetting({ confirmModal }) {
  const {
    setSaveModal,
    setSaveAction,
    setUpdateData,
    setModalTitle,
  } = confirmModal;

  const start = useAccountBookData(store => store.accountBook.startday);
  const accountBookId = useAccountBookData(store => store.accountBook._id);
  const [startDay, setStartDay] = useState('');

  const onClickSaveBtn = () => {
    setModalTitle(() => '변경사항을 저장하시겠습니까?');
    setSaveModal(() => true);
    setUpdateData(() => {
      return { accountBookId, startday: startDay };
    });
    setSaveAction(() => updateStartDay);
  };

  useEffect(() => {
    setStartDay(start);
  }, [start]);

  return (
    <div className="calendar__setting__container">
      <div className="calendar__setting__startday">
        <div className="calendar__setting__title">
          Start Day
          <div className="calendar__save__btn">
            <ActionButton
              type="general"
              content="Save"
              action={onClickSaveBtn}
            />
          </div>
        </div>
        <div className="calendar__setting__desc">
          You can select start day of Calendar
        </div>
        <DayRadioButton startDay={startDay} setStartDay={setStartDay} />
        <WeekHeader startDay={startDay} />
      </div>
    </div>
  );
}
