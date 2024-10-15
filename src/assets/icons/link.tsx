import React, {FC} from 'react';
import cls from 'classnames';

type Props = {
  className?: string;
};

const Link: FC<Props> = ({className}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={cls('stroke-current', className)}
    >
      <g clipPath="url(#clip0_1380_969)">
        <path
          d="M12.5002 5.83337H15.0002C15.5473 5.83337 16.0892 5.94115 16.5947 6.15054C17.1002 6.35994 17.5595 6.66685 17.9464 7.05376C18.3334 7.44067 18.6403 7.9 18.8497 8.40553C19.0591 8.91105 19.1668 9.45287 19.1668 10C19.1668 10.5472 19.0591 11.089 18.8497 11.5946C18.6403 12.1001 18.3334 12.5594 17.9464 12.9463C17.5595 13.3332 17.1002 13.6401 16.5947 13.8495C16.0892 14.0589 15.5473 14.1667 15.0002 14.1667H12.5002M7.50016 14.1667H5.00016C4.45299 14.1667 3.91117 14.0589 3.40565 13.8495C2.90012 13.6401 2.4408 13.3332 2.05388 12.9463C1.27248 12.1649 0.833496 11.1051 0.833496 10C0.833496 8.89497 1.27248 7.83516 2.05388 7.05376C2.83529 6.27236 3.89509 5.83337 5.00016 5.83337H7.50016M6.66683 10H13.3335"
          fill="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1380_969">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export {Link};
