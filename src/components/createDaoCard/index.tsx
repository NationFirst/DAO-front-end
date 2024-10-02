import React from 'react';
import styled from 'styled-components';

import ButtonCreateDao from 'components/buttons/buttonCreateDao';

const CreateDaoCard = () => {
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
        <ButtonCreateDao />
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
