import React, {useRef} from 'react';
import {styled} from 'styled-components';
import cls from 'classnames';

import {Button, IconType} from '@aragon/ods';

export type NumberInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** Changes a input's color schema */
  mode?: 'default' | 'success' | 'warning' | 'critical';
  /**
   * change the input view with corresponding symbols
   */
  view?: 'default' | 'percentage' | 'bigger';
  disabled?: boolean;
  width?: number;
  value: string;
  disableIncrement?: boolean;
  disableDecrement?: boolean;
  /** Determines whether decimal values are accepted */
  includeDecimal?: boolean;
};

export const NumberInput: React.FC<NumberInputProps> = ({
  mode = 'default',
  view = 'default',
  disabled,
  disableDecrement,
  disableIncrement,
  width,
  value,
  includeDecimal,
  onChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStepperChange = (mode: 'up' | 'down') => {
    mode === 'up' ? inputRef.current?.stepUp() : inputRef.current?.stepDown();

    // For Calling th onChange Function
    inputRef.current?.dispatchEvent(new Event('input', {bubbles: true}));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!includeDecimal && event.key === '.') {
      event?.preventDefault();
    } else {
      props.onKeyDown?.(event);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // this handles pasting in the value/ could also use onPaste event
    if (!includeDecimal) {
      event.target.value = event.target.value.replace(/[^-0-9]/g, '');
    }

    onChange?.(event);
  };

  // input width based on view
  const inputWidth: {
    [value: string]: string;
  } = {
    bigger: 'w-16',
    percentage: 'w-7',
    default: 'w-full',
  };

  // input placeholder based on view
  const placeholder: {
    [value: string]: string;
  } = {
    bigger: '≥0',
    percentage: '0%',
    default: '0',
  };

  // input range based on view
  const inputRange: {
    [value: string]: {
      min?: number;
      max?: number;
    };
  } = {
    bigger: {
      min: 0,
    },
    percentage: {
      min: 0,
      max: 100,
    },
    default: {},
  };

  return (
    <Container data-testid="number-input" {...{mode, disabled, width}}>
      <StyledIconButton
        name="down"
        variant="tertiary"
        size="sm"
        iconLeft={IconType.MINUS}
        disabled={disabled ?? disableDecrement}
        onClick={() => handleStepperChange('down')}
      />
      <InputWrapper>
        {view === 'bigger' && value !== '' && (
          <LeftAdornment disabled={disabled}>≥</LeftAdornment>
        )}
        <StyledNumberInput
          {...props}
          {...{value}}
          {...inputRange[view]}
          inputWidth={inputWidth[view]}
          ref={inputRef}
          disabled={disabled}
          type="number"
          placeholder={placeholder[view]}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onWheel={e => {
            e.preventDefault();
            (e.target as HTMLInputElement).blur();
          }}
        />
        {view === 'percentage' && value !== '' && (
          <Percent disabled={disabled}>%</Percent>
        )}
      </InputWrapper>
      <StyledIconButton
        name="up"
        variant="tertiary"
        size="sm"
        iconLeft={IconType.PLUS}
        disabled={disabled ?? disableIncrement}
        onClick={() => handleStepperChange('up')}
      />
    </Container>
  );
};

export type StyledContainerProps = Pick<
  NumberInputProps,
  'mode' | 'disabled' | 'width'
>;

const Container = styled.div.attrs<StyledContainerProps>(
  ({mode, disabled, width}) => ({
    className: cls(
      {'w-full': !width, 'bg-neutral-100': disabled, 'bg-neutral-0': !disabled},
      'inline-flex bg-neutral-0 items-center justify-between py-2.5 px-2.5 rounded-xl border-3',
      'focus:outline-none focus-within:border-primary-400 focus-within:hover:border-primary-400 active:border-primary-400 hover:border-primary-400 transition-colors',
      {
        'border-primary-50': mode === 'default',
        'border-success-600': mode === 'success',
        'border-warning-600': mode === 'warning',
        'border-critical-600': mode === 'critical',
      }
    ),
    ...(width && {style: {width}}),
  })
)<StyledContainerProps>``;
const InputWrapper = styled.div.attrs({
  className: 'flex justify-center w-4/5',
})``;

export type StyledNumberInputProps = Pick<NumberInputProps, 'disabled'> & {
  inputWidth: string;
};

export type PercentProps = Pick<NumberInputProps, 'disabled'>;

const Percent = styled.label.attrs<PercentProps>(({disabled}) => {
  const className: string | undefined = `${
    disabled ? 'text-neutral-300' : 'text-neutral-600'
  }`;
  return {
    className,
  };
})<PercentProps>``;

const LeftAdornment = styled.label.attrs<PercentProps>(({disabled}) => {
  const className: string | undefined = `${
    disabled ? 'text-neutral-300' : 'text-neutral-600'
  }`;
  return {
    className,
  };
})<PercentProps>``;

const StyledNumberInput = styled.input.attrs<StyledNumberInputProps>(
  ({disabled, inputWidth}) => {
    const className: string | undefined = `${
      disabled ? 'text-neutral-300' : 'text-neutral-600'
    } bg-[transparent] margin-0 ${inputWidth}`;
    return {
      className,
    };
  }
)<StyledNumberInputProps>`
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
  text-align: center;
  outline: 0;
`;

const StyledIconButton = styled(Button).attrs({
  className: 'rounded-lg',
})``;
