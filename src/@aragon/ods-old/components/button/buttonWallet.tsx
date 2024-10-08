import React, {type ButtonHTMLAttributes, type FC} from 'react';
import {styled} from 'styled-components';
import {Icon, IconType} from '@aragon/ods';
import cls from 'classnames';

import {shortenAddress} from '../../utils';
import {AvatarWallet} from '../avatar';
import {Spinner} from '../spinner';

export type ButtonWalletProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * set wallet Address/Ens
   */
  label: string | null;
  /**
   * Avatar Image source
   */
  src: string | null;
  /**
   * Loading mode
   */
  isLoading?: boolean;
  /**
   * Check if wallet is connected!
   */
  isConnected?: boolean;
  theme?: 'light' | 'dark';
};

export const ButtonWallet: FC<ButtonWalletProps> = ({
  label,
  src,
  isLoading = false,
  isConnected = false,
  theme = 'dark',
  ...props
}) => {
  return (
    <StyledButton {...props} {...{isLoading, theme}}>
      <StyledLabel>{shortenAddress(label)}</StyledLabel>
      <Avatar {...{isConnected, isLoading, src}} />
    </StyledButton>
  );
};

type AvatarProps = Pick<ButtonWalletProps, 'isLoading' | 'isConnected' | 'src'>;

const Avatar: FC<AvatarProps> = ({isConnected, isLoading, src}) => {
  if (!isConnected) {
    return <Icon icon={IconType.PERSON} />;
  }
  if (isLoading) {
    return <Spinner size="small" />;
  }
  return <AvatarWallet src={src ?? ''} />;
};

type StyledButtonProp = Pick<ButtonWalletProps, 'isLoading' | 'theme'>;

const StyledButton = styled.button.attrs<StyledButtonProp>(
  ({isLoading, theme}) => ({
    className: cls(
      {
        'text-neutral-0 border-white/10 hover:border-white/30 active:border-white/30':
          theme === 'light',
        'text-primary-400 border-primary-400/10 hover:border-primary-400/30 active:border-primary-400/30':
          theme === 'dark',
      },
      'flex items-center gap-x-3 transition-colors  rounded-xl  border-2 p-2.5 px-4'
    ),
  })
)``;

const StyledLabel = styled.span.attrs({
  className: 'md:inline hidden',
})``;
