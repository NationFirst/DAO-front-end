import React, {FC} from 'react';
import styled from 'styled-components';

import Arrow from 'assets/icons/arrow';

type Props = {
  onClick: () => void;
};

const ButtonCreateDao: FC<Props> = ({onClick}) => {
  return (
    <Button onClick={onClick}>
      CREATE A DAO
      <ArrowRight />
    </Button>
  );
};

const ArrowRight = styled(Arrow).attrs({
  className:
    'absolute right-0 top-1/2 -translate-x-full -translate-y-1/2 text-neutral-0',
  h: 22,
  w: 22,
})``;

const Button = styled.button.attrs({
  className:
    'font-normal relative px-20 w-fit text-neutral-0 rounded-full bg-primary-400 py-4 border border-[3px] border-primary-50',
})``;

export default ButtonCreateDao;
