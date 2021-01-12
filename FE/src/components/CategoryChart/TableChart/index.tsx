import React, { useEffect } from 'react';

import { useDateInfoData } from '../../../store/DateInfo/dateInfoHook';
import { useThemeData } from '../../../store/Theme/themeHook';
import CommaMaker from '../../../util/commaForMoney';
import ChartColorCollections from '../../../util/chartColorCollection';
import './tableChart.scss';

export default function TableChart({ chartInfo, refs }) {
  const DateInfo = useDateInfoData(store => store.nowCalendarInfo);
  const theme = useThemeData(store => store.mode);

  const drawAnimation = () => {
    if (chartInfo.length !== 0) {
      refs.forEach((_, i) => {
        const stats = refs[i].current;
        stats.style.width = `${+Math.floor(stats.dataset.percent)}%`;
        stats.style.setProperty('--table', +Math.floor(stats.dataset.percent));
      });
    }
  };

  useEffect(() => {
    drawAnimation();
  }, [chartInfo, drawAnimation]);

  return (
    <div className={theme == 'dark' ? 'pie__table' : 'pie__table light'}>
      {chartInfo &&
        chartInfo.map((el, i) => (
          <div
            className={theme === 'dark' ? 'stat__unit' : 'stat__unit light'}
            key={DateInfo.year + DateInfo.month + el.category}
          >
            <span
              className={
                theme === 'dark' ? 'stat__category' : 'stat__category light'
              }
            >
              {el.category}
            </span>
            <span
              className={
                theme === 'dark' ? 'stat__percent' : 'stat__percent light'
              }
            >
              {' '}
              {el.percent.toFixed(1)}%
            </span>
            <span
              className={
                theme === 'dark' ? 'stat__background' : 'stat__background light'
              }
            >
              <span
                ref={refs[i]}
                data-percent={`${el.percent}`}
                className={
                  theme === 'dark' ? 'stat__color' : 'stat__color light'
                }
                style={{
                  display: 'inline-block',
                  // width: `0%`,
                  height: '20px',
                  backgroundColor: `${ChartColorCollections[i]}`,
                }}
              />
            </span>
            <span
              className={theme === 'dark' ? 'stat__price' : 'stat__price light'}
            >
              {' '}
              {CommaMaker(el.cost)}원
            </span>
          </div>
        ))}
    </div>
  );
}
