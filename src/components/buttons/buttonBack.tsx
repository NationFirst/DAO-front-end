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
      <Arrow className="rotate-180" w={20} h={20} />
      {title}
    </Button>
  );
};

const Button = styled.button.attrs({
  className:
    'inline-flex items-center gap-3 rounded-xl p-2.5 px-4 text-base border-2 transition-all text-primary-400 border-primary-400/10 hover:border-primary-400/30 active:border-primary-400/30',
})``;

export default ButtonBack;
