import {type TextareaHTMLAttributes} from 'react';
import {styled} from 'styled-components';

export type TextareaSimpleProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className'
>;

export const TextareaSimple = styled.textarea.attrs({
  className: `py-3 px-4 rounded-xl resize-none w-full border-3 border-primary-50 hover:border-primary-400
    placeholder-neutral-200
    disabled:bg-neutral-100 disabled:border-neutral-200 focus-within:border-primary-400 focus-within:hover:border-primary-400 focus:outline-none bg-neutral-0 text-neutral-600 active:border-primary-600
    transition-colors`,
})`
  min-height: 144px;

  ::-webkit-input-placeholder {
    color: #9aa5b1;
  }
  ::-moz-placeholder {
    color: #9aa5b1;
  }
  :-ms-input-placeholder {
    color: #9aa5b1;
  }
  :-moz-placeholder {
    color: #9aa5b1;
  }
`;
