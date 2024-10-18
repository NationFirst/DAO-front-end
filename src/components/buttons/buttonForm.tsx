import React, {forwardRef, HTMLAttributes} from 'react';
import styled from 'styled-components';

type Props = HTMLAttributes<HTMLButtonElement> & {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: string;
};

const ButtonForm = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {iconLeft, iconRight, children, ...otherProps} = props;
  return (
    <StyledButton {...otherProps} ref={ref}>
      {iconLeft}
      {children}
      {iconRight}
    </StyledButton>
  );
});

const StyledButton = styled.button.attrs({
  className:
    'h-14 px-6 rounded-xl shadow-card disabled:opacity-40 relative overflow-hidden',
})`
  &:not([disabled])&::after {
    content: '';
    position: absolute;
    background: rgba(0, 0, 0, 0.05);
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

ButtonForm.displayName = 'ButtonForm';

export default ButtonForm;
