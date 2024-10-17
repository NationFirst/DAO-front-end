import React, {FC} from 'react';
import cls from 'classnames';

type Props = {
  className?: string;
};

const Home: FC<Props> = ({className = ''}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 -960 960 960"
      width="20"
      className={cls('fill-current', className)}
    >
      <path d="M264-216h96v-204q0-15.3 10.35-25.65Q380.7-456 396-456h168q15.3 0 25.65 10.35Q600-435.3 600-420v204h96v-348L480-726 264-564v348Zm-72-12v-336q0-16.85 7.5-31.92Q207-611 221-622l216-162q20-14 43-14t43 14l216 162q14 11 21.5 26.08Q768-580.85 768-564v336q0 34.65-24.67 59.32Q718.65-144 684-144H564q-15.3 0-25.65-10.35Q528-164.7 528-180v-204h-96v204q0 15.3-10.35 25.65Q411.3-144 396-144H276q-34.65 0-59.32-24.68Q192-193.35 192-228Zm288-243Z" />
    </svg>
  );
};

export {Home};
