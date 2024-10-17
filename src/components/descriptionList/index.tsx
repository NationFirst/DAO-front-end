import React, {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {CheckboxListItem, CheckboxListItemProps, Tag} from '@aragon/ods-old';
import {AlertInline} from '@aragon/ods';
import ButtonForm from '../buttons/buttonForm';

export type DescriptionListProps = {
  title: string;
  onEditClick?: () => void;
  editLabel?: string;
  checkBoxErrorMessage?: string;
  checkedState?: CheckboxListItemProps['type'];
  onChecked?: () => void;
  tagLabel?: string;
  children: ReactNode;
};

// TODO: This needs to be reworked, as it currently leads to nested DL (DLs get
// passed in as children to this component, where they get wrapped in DLs
// again). [VR 17-01-2023]

// Also, the sizing is hardcoded and will fail when a term is less than 30% of
// container size. [FF 11-02-2023]

export const DescriptionListContainer: React.FC<DescriptionListProps> = ({
  title,
  children,
  onEditClick,
  editLabel,
  checkBoxErrorMessage,
  checkedState,
  onChecked,
  tagLabel: badgeLabel,
}) => {
  const {t} = useTranslation();

  return (
    <Container>
      <HStack>
        <TitleContainer>
          <TitleText>{title}</TitleText>
          {badgeLabel && (
            <div>
              <Tag label={badgeLabel || ''} colorScheme="info" />
            </div>
          )}
        </TitleContainer>
        {onEditClick && (
          <ButtonForm onClick={onEditClick}>
            {editLabel || t('labels.edit')}
          </ButtonForm>
        )}
      </HStack>
      <DlContainer>{children}</DlContainer>
      {onChecked && (
        <div className="ml-auto space-y-3 md:w-3/4">
          <div className="md:flex">
            <CheckboxListItem
              label={t('createDAO.review.valuesCorrect')}
              multiSelect
              onClick={() => onChecked?.()}
              type={checkedState}
            />
          </div>
          {checkedState === 'error' && checkBoxErrorMessage && (
            <AlertInline message={checkBoxErrorMessage} variant="critical" />
          )}
        </div>
      )}
    </Container>
  );
};

export const Dt: React.FC<{children: ReactNode}> = ({children}) => (
  <DtContainer>{children}</DtContainer>
);

export const Dd: React.FC<{children: ReactNode}> = ({children}) => (
  <DdContainer>{children}</DdContainer>
);

export const Dl: React.FC<{children: ReactNode}> = ({children}) => (
  <DlContainer>
    <ListItemContainer>{children}</ListItemContainer>
  </DlContainer>
);

const Container = styled.div.attrs({
  className: 'py-4 space-y-6 bg-neutral-0',
})``;

const TitleText = styled.h1.attrs({
  className: 'text-xl leading-normal font-semibold text-neutral-800',
})``;

const TitleContainer = styled.div.attrs({
  className: 'flex space-x-4 items-center',
})``;

const DlContainer = styled.dl.attrs({
  className: 'space-y-4',
})``;

const ListItemContainer = styled.div.attrs({
  className: 'md:flex justify-between md:space-x-4 space-y-1 md:space-y-0',
})``;

const DtContainer = styled.dt.attrs({
  className: 'flex items-center font-semibold text-neutral-800',
})``;

const DdContainer = styled.dd.attrs({
  className: 'shrink-0 text-neutral-600',
})`
  width: 70%;
`;

const HStack = styled.div.attrs({
  className: 'flex justify-between items-center',
})``;

export const ActionCardDlContainer = styled.div.attrs({
  className:
    'bg-neutral-50 rounded-b-xl border border-t-0 border-neutral-100 space-y-4 p-6',
})``;
