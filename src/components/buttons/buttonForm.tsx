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
  className: 'h-14 px-6 rounded-xl shadow-card disabled:opacity-40',
})``;

ButtonForm.displayName = 'ButtonForm';

export default ButtonForm;
