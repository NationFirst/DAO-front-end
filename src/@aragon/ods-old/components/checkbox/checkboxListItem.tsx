import React from 'react';
import {styled} from 'styled-components';
import {Icon, IconType} from '@aragon/ods';
import cls from 'classnames';

export const Icons = {
  multiSelect: {
    active: <Icon icon={IconType.CHECKBOX_SELECTED} />,
    multi: <Icon icon={IconType.CHECKBOX_INDETERMINATE} />,
    default: <Icon icon={IconType.CHECKBOX} />,
    error: <Icon icon={IconType.CHECKBOX} />,
  },
  radio: {
    active: <Icon icon={IconType.RADIO_SELECTED} />,
    multi: <Icon icon={IconType.RADIO} />,
    default: <Icon icon={IconType.RADIO} />,
    error: <Icon icon={IconType.RADIO} />,
  },
};

export type CheckboxListItemProps = {
  label: string;
  helptext?: string;
  disabled?: boolean;
  multiSelect?: boolean;
  type?: 'default' | 'error' | 'active' | 'multi';
  onClick?: React.MouseEventHandler;
};

export const CheckboxListItem: React.FC<CheckboxListItemProps> = ({
  label,
  helptext,
  multiSelect = false,
  disabled = false,
  type = 'default',
  onClick,
}) => {
  return (
    <Container
      data-testid="checkboxListItem"
      type={type}
      disabled={disabled}
      {...(disabled ? {} : {onClick})}
    >
      <HStack disabled={disabled} type={type}>
        <p className="font-semibold">{label}</p>
        {Icons[multiSelect ? 'multiSelect' : 'radio'][type]}
      </HStack>
      {helptext && <Helptext>{helptext}</Helptext>}
    </Container>
  );
};

type ContainerTypes = {
  disabled: boolean;
  type: CheckboxListItemProps['type'];
};

const Container = styled.div.attrs<ContainerTypes>(({disabled, type}) => ({
  className: cls(
    'py-3.5 px-4 rounded-xl border-3',
    'focus:outline-none focus-visible:ring focus-visible:ring-primary transition-colors',
    {
      'bg-neutral-100 border-neutral-300': disabled,
      'bg-neutral-0 group hover:border-primary-500 cursor-pointer': !disabled,
      'border-critical-500': !disabled && type === 'error',
      'border-primary-400': !disabled && type !== 'error' && type !== 'default',
      'border-primary-50': !disabled && type === 'default',
    }
  ),
  tabIndex: disabled ? -1 : 0,
}))<ContainerTypes>``;

const HStack = styled.div.attrs<ContainerTypes>(({disabled, type}) => ({
  className: `flex justify-between items-center group-hover:text-primary-500 space-x-3 ${
    disabled
      ? 'text-neutral-600'
      : type === 'default' || type === 'error'
      ? 'text-neutral-600'
      : 'text-primary-500'
  }`,
}))<ContainerTypes>``;

const Helptext = styled.p.attrs({
  className: 'ft-text-sm text-neutral-500 mt-0.5 mr-7',
})``;
