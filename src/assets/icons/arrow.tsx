import React, {FC} from 'react';

type Props = {
  className?: string;
  w?: number;
  h?: number;
};

const Arrow: FC<Props> = ({className, w = 24, h = 24}) => {
  return (
    <div style={{width: w, height: h}} className={className}>
      <svg
        className={'fill-current'}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 26 27"
      >
        <path d="M5.46 14.274h12.748l-3.902 4.696a1.078 1.078 0 0 0 1.655 1.379l5.375-6.463c.036-.05.068-.105.096-.161 0-.054.054-.086.076-.14a1.08 1.08 0 0 0 .075-.388 1.079 1.079 0 0 0-.075-.387c0-.054-.054-.087-.076-.14a1.28 1.28 0 0 0-.096-.162l-5.374-6.462a1.075 1.075 0 0 0-1.78.186 1.078 1.078 0 0 0 .124 1.192l3.902 4.696H5.46a1.074 1.074 0 0 0-1.074 1.077 1.078 1.078 0 0 0 1.074 1.077Z" />
      </svg>
    </div>
  );
};

export default Arrow;
