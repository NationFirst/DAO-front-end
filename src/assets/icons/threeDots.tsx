import React, {FC} from 'react';
import cls from 'classnames';

type Props = {
  className?: string;
};

const ThreeDots: FC<Props> = ({className}) => {
  return (
    <svg
      width="5"
      height="23"
      viewBox="0 0 5 23"
      className={cls('fill-current', className)}
    >
      <circle cx="2.5" cy="2.5" r="2.5" />
      <circle cx="2.5" cy="11.5" r="2.5" />
      <circle cx="2.5" cy="20.5" r="2.5" />
    </svg>
  );
};

export {ThreeDots};
