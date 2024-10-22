import React, {FC} from 'react';
import styled from 'styled-components';

import {Home} from 'assets/icons';
import useScreen from '../../hooks/useScreen';
import Arrow from '../../assets/icons/arrow';

type Props = {
  title?: string;
  onClick: () => void;
};

const ButtonHome: FC<Props> = ({onClick, title = ''}) => {
  const {isMobile} = useScreen();

  return (
    <Button onClick={onClick}>
      {!isMobile ? (
        <>
          <Arrow className="rotate-180" w={20} h={20} />
          {title}
        </>
      ) : (
        <Home />
      )}
    </Button>
  );
};

const Button = styled.button.attrs({
  className:
    'inline-flex items-center bg-white gap-3 rounded-xl p-2.5 xl:px-4 text-base border-2 transition-all text-primary-400 border-primary-400/10 hover:border-primary-400/30 active:border-primary-400/30',
})``;

export default ButtonHome;
