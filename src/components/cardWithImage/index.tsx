import React from 'react';
import styled from 'styled-components';

type CardWithImageProps = {
  imgSrc: React.ReactNode;
  caption: string;
  title: string;
  subtitle?: string;
};

const CardWithImage: React.FC<CardWithImageProps> = ({
  imgSrc,
  caption,
  title,
  subtitle,
}) => {
  return (
    <Container>
      <ImageContainer>{imgSrc}</ImageContainer>
      <VStack>
        <Caption>{caption}</Caption>
        <Title>{title}</Title>
        {!!subtitle && <Subtitle>{subtitle}</Subtitle>}
      </VStack>
    </Container>
  );
};

export default CardWithImage;

const Container = styled.div.attrs({
  className:
    'flex-1 overflow-hidden rounded-[30px] bg-neutral-0 mx-2 mb-6 xl:m-0 shadow-card',
})``;

const ImageContainer = styled.div.attrs({
  className: 'rounded-xl flex justify-center',
})``;

const VStack = styled.div.attrs({
  className: 'space-y-4 p-8',
})``;

const Caption = styled.div.attrs({
  className:
    'h-14 w-14 rounded-xl bg-primary-50 flex justify-center items-center font-semibold text-primary-400 text-3xl',
})``;

const Title = styled.div.attrs({
  className: 'text-neutral-800',
})``;

const Subtitle = styled.div.attrs({
  className: 'text-sm leading-normal text-neutral-600',
})``;
