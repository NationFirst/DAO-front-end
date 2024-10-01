import React, {FC} from 'react';
import styled from 'styled-components';

import Arrow from 'assets/icons/arrow';

type Props = {
  title: string;
  onClick: () => void;
};

const ButtonBack: FC<Props> = ({onClick, title}) => {
  return (
    <Button onClick={onClick}>
      <Arrow className="rotate-180" />
      {title}
    </Button>
  );
};

const Button = styled.button.attrs({
  className:
    'inline-flex items-center gap-3 bg-white rounded-xl px-5 py-3 text-base hover:shadow-neutral-md transition-all',
})``;

export default ButtonBack;
