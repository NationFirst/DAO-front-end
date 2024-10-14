import React, {FC} from 'react';
import {styled} from 'styled-components';

type Props = {
  children: string;
};

const Help: FC<Props> = ({children}) => {
  return <HelpText>{children}</HelpText>;
};

const HelpText = styled.p.attrs({
  className: 'ft-text-sm font-normal text-neutral-600',
})``;

export {Help};
