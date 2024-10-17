import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Controller, useFormContext} from 'react-hook-form';
import AddWallets from 'components/addWallets';
import {alphaNumericValidator} from 'utils/validators';
import {htmlIn} from 'utils/htmlIn';
import {Label, TextInput} from '@aragon/ods-old';
import {AlertInline} from '@aragon/ods';
import {Help} from '@aragon/ods-old/components/help';

const CreateNewToken: React.FC = () => {
  const {t} = useTranslation();
  const {control} = useFormContext();

  return (
    <>
      <DescriptionContainer>
        <Title>{t('labels.mintToken')}</Title>
        <Subtitle
          dangerouslySetInnerHTML={{
            __html: htmlIn(t)('createDAO.step3.createTokenHelptext'),
          }}
        ></Subtitle>
      </DescriptionContainer>
      <FormItem>
        <Label label={t('labels.tokenName')} />

        <Controller
          name="tokenName"
          control={control}
          defaultValue=""
          rules={{
            required: t('errors.required.tokenName') as string,
            validate: value =>
              alphaNumericValidator(value, t('errors.fields.tokenName')),
          }}
          render={({
            field: {onBlur, onChange, value, name},
            fieldState: {error},
          }) => (
            <>
              <TextInput
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
              />
              <Help>{t('createDAO.step3.nameSubtitle')}</Help>
              {error?.message && (
                <AlertInline message={error.message} variant="critical" />
              )}
            </>
          )}
        />
      </FormItem>
      <FormItem>
        <Label label={t('labels.tokenSymbol')} />

        <Controller
          name="tokenSymbol"
          control={control}
          defaultValue=""
          rules={{
            required: t('errors.required.tokenSymbol') as string,
            validate: value =>
              alphaNumericValidator(value, t('errors.fields.tokenSymbol')),
          }}
          render={({
            field: {onBlur, onChange, value, name},
            fieldState: {error},
          }) => (
            <>
              <TextInput
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
              />
              <Help>{t('createDAO.step3.symbolSubtitle')}</Help>
              {error?.message && (
                <AlertInline message={error.message} variant="critical" />
              )}
            </>
          )}
        />
      </FormItem>
      <FormItem>
        <DescriptionContainer>
          <Label label={t('labels.distributeTokens')} />
        </DescriptionContainer>

        <AddWallets />
        <Help>{t('createDAO.step3.distributeTokensHelpertext')}</Help>
        <AlertInline
          message={t('createDAO.step3.distributionWalletAlertText')}
          variant="info"
        />
      </FormItem>
    </>
  );
};

export default CreateNewToken;

const FormItem = styled.div.attrs({
  className: 'space-y-3',
})``;

const DescriptionContainer = styled.div.attrs({
  className: 'space-y-1',
})``;

const Title = styled.p.attrs({
  className: 'text-xl leading-normal font-semibold text-neutral-800',
})``;

const Subtitle = styled.p.attrs({className: 'text-neutral-600 text-bold'})``;
