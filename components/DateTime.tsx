import React from 'react';
import dayjs from 'dayjs';

interface Props {
  /**
   * タイムスタンプ
   */
  timestamp: number;
  /**
   * フォーマット
   */
  format?: string;
}
export const DateTime: React.FC<Props> = (props) => {
  const dt = dayjs(props.timestamp);
  const now = dayjs();
  const isSameDate = dayjs(dt.format('YYYY-MM-DD')).isSame(now.format('YYYY-MM-DD'));
  const isPreviousDate = dayjs(dt.format('YYYY-MM-DD')).isSame(now.subtract(1, 'day').format('YYYY-MM-DD'));
  const format = props.format || (isSameDate ? '今日のHH:mm' : isPreviousDate ? '昨日のHH:mm' : 'YYYY年M月D日 HH:mm');
  const timestamp = dt.format('YYYY-MM-DD HH:mm:ss');
  const text = dt.format(format);

  return (
    <time {...props} dateTime={timestamp}>
      {text}
    </time>
  );
};
