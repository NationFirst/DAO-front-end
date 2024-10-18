import React, {FC, ReactNode} from 'react';
import styled from 'styled-components';
import cls from 'classnames';

type Props = {
  variant?: 'fill' | 'outline';
  children: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
};

const Button: FC<Props> = ({
  variant = 'outline',
  children,
  iconLeft,
  iconRight,
  onClick,
  disabled = false,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    !disabled && onClick(e);
  };

  return (
    <StyledButton variant={variant} disabled={disabled} onClick={handleClick}>
      {!!iconLeft && <Icon left>{iconLeft}</Icon>}
      <span>{children}</span>
      {!!iconRight && <Icon right>{iconRight}</Icon>}
    </StyledButton>
  );
};

type IconProps = {
  left?: boolean;
  right?: boolean;
};

type StyledButtonProps = Pick<Props, 'variant'>;

const StyledButton = styled.button.attrs<StyledButtonProps>(({variant}) => ({
  className: cls(
    {
      'text-white bg-primary-400 border-primary-50': variant === 'fill',
      'text-primary-400 bg-white': variant === 'outline',
    },
    'border-2 relative py-4 w-[325px] rounded-full overflow-hidden disabled:opacity-30'
  ),
}))`
  &:not([disabled])&::after {
    content: '';
    position: absolute;
    background: rgba(0, 0, 0, 0.15);
    inset: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 150ms;
  }

  &:not([disabled])&:hover&:active,
  &:not([disabled])&:hover&::after {
    opacity: 1;
  }
`;

const Icon = styled.div.attrs<IconProps>(({left, right}) => ({
  className: cls(
    {'translate-x-full left-0': left},
    {'-translate-x-full right-0': right},
    'absolute top-1/2 -translate-y-1/2 pointer-events-none'
  ),
}))``;

export default Button;
