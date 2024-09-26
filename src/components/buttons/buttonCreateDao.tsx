import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

import {useWallet} from '../../hooks/useWallet';
import {trackEvent} from '../../services/analytics';
import {CreateDAO} from '../../utils/paths';
import Arrow from '../../assets/icons/arrow';

const ButtonCreateDao = () => {
  const navigate = useNavigate();
  const {methods, isConnected} = useWallet();

  const handleClick = useCallback(() => {
    trackEvent('landing_createDaoBtn_clicked');

    if (isConnected) {
      navigate(CreateDAO);
      return;
    }

    methods
      .selectWallet()
      .then(() => {
        navigate(CreateDAO);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }, [isConnected, methods, navigate]);

  return (
    <Button onClick={handleClick}>
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
