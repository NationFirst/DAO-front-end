import styled from 'styled-components';

export const GridLayout = styled.main.attrs({
  className:
    'grid 2xl:w-[1520px] ' +
    'grid-cols-4 md:grid-cols-8 xl:grid-cols-12 ' +
    'gap-4 xl:gap-6 2xl:gap-8 ' +
    'mx-4 md:mx-6 xl:mx-10 2xl:mx-auto',
})``;
