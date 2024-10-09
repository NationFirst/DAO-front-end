import React from 'react';
import styled from 'styled-components';
import cls from 'classnames';

function Hero() {
  return (
    <Wrapper>
      <Title>
        Building DAOs for <Accented white>Indigenous</Accented>{' '}
        <Accented>Sovereignty</Accented>
      </Title>
      <Subtitle>
        Create your DAO, engage with Indigenous-driven projects, and explore new
        ways to strengthen self-determination and cultural preservation.
      </Subtitle>
    </Wrapper>
  );
}

const Wrapper = styled.div.attrs({
  className: 'text-neutral-0',
})``;

const Title = styled.h1.attrs({
  className: 'font-normal text-[40px] leading-tight mb-7',
})``;

const Subtitle = styled.h3.attrs({
  className: 'font-normal text-2xl leading-tight',
})``;

type AccentedProps = {
  white?: boolean;
};

const Accented = styled.span.attrs<AccentedProps>(({white}) => ({
  className: cls({'text-accent': !white}, 'font-semibold'),
}))``;

export default Hero;
