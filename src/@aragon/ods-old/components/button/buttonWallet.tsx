import React, {type ButtonHTMLAttributes, type FC} from 'react';
import {styled} from 'styled-components';

import {shortenAddress} from '../../utils';
import {AvatarWallet} from '../avatar';
import {Spinner} from '../spinner';
import {Icon, IconType} from '@aragon/ods';

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
};

export const ButtonWallet: FC<ButtonWalletProps> = ({
  label,
  src,
  isLoading = false,
  isConnected = false,
  ...props
}) => {
  return (
    <StyledButton {...props} {...{isLoading}}>
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

type StyledButtonProp = Pick<ButtonWalletProps, 'isLoading'>;

const StyledButton = styled.button.attrs<StyledButtonProp>(({isLoading}) => ({
  className:
    'flex items-center gap-x-3 text-neutral-0 active:border-white/30 hover:border-white/30 rounded-xl border-white/10 border-2 p-2.5 px-4',
}))``;

const StyledLabel = styled.span.attrs({
  className: 'md:inline hidden',
})``;
