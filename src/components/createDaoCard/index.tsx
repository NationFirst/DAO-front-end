import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

import ButtonCreateDao from 'components/buttons/buttonCreateDao';
import {useWallet} from 'hooks/useWallet';
import {trackEvent} from 'services/analytics';
import {CreateDAO} from 'utils/paths';

const CreateDaoCard = () => {
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
    <Card>
      <ContentWrapper>
        <Title>
          Build Your <Accented>DAO</Accented>
        </Title>
        <Subtitle>
          Effortlessly mint tokens, establish governance structures, and bring
          your DAO to life on the Nationsfirst Network with our easy, no-code
          platform.
        </Subtitle>
        <ButtonCreateDao onClick={handleClick} />
      </ContentWrapper>
    </Card>
  );
};

const Card = styled.div.attrs({
  className: 'bg-neutral-0 rounded-[50px] p-12 h-[600px] flex',
})``;

const ContentWrapper = styled.div.attrs({
  className: 'flex flex-col gap-7 mt-auto',
})``;

const Title = styled.h2.attrs({
  className: 'font-semibold text-[40px]',
})``;

const Subtitle = styled.p.attrs({
  className: 'text-sm',
})``;

const Accented = styled.span.attrs({
  className: 'text-accent font-semibold',
})``;

export default CreateDaoCard;
