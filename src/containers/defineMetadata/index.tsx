import React, {useCallback} from 'react';
import {
  InputImageSingle,
  Label,
  TextareaSimple,
  TextInput,
} from '@aragon/ods-old';
import {AlertInline} from '@aragon/ods';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import AddLinks from 'components/addLinks';
import {useNetwork} from 'context/network';
import {useProviders} from 'context/providers';
import {ENS_SUPPORTED_NETWORKS, URL_PATTERN} from 'utils/constants';
import {isOnlyWhitespace} from 'utils/library';
import {isDaoEnsNameValid} from 'utils/validators';
import {Help} from '../../@aragon/ods-old/components/help';
import {GridLayout} from '../../components/layout';

const DAO_LOGO = {
  maxDimension: 2400,
  minDimension: 256,
  maxFileSize: 3000000,
};

const BYTES_IN_MB = 1000000;

export type DefineMetadataProps = {
  arrayName?: string;
  isSettingPage?: boolean;
  bgWhite?: boolean;
};

const DefineMetadata: React.FC<DefineMetadataProps> = ({
  arrayName = 'links',
  bgWhite = false,
  isSettingPage,
}) => {
  const {t} = useTranslation();
  const {network} = useNetwork();
  const {control, setError, clearErrors, getValues} = useFormContext();
  const {api: provider} = useProviders();

  const supportsENS = ENS_SUPPORTED_NETWORKS.includes(network);

  const handleImageError = useCallback(
    (error: {code: string; message: string}) => {
      const imgError: FieldError = {type: 'manual'};
      const {minDimension, maxDimension, maxFileSize} = DAO_LOGO;
      switch (error.code) {
        case 'file-invalid-type':
          imgError.message = t('errors.invalidImageType');
          break;
        case 'file-too-large':
          {
            // convert to mb
            const sizeInMb = maxFileSize / BYTES_IN_MB;
            imgError.message = t('errors.imageTooLarge', {
              maxFileSize: sizeInMb,
            });
          }

          break;
        case 'wrong-dimension':
          imgError.message = t('errors.imageDimensions', {
            minDimension,
            maxDimension,
          });
          break;
        default:
          imgError.message = t('errors.invalidImage');
          break;
      }

      setError('daoLogo', imgError);
    },
    [setError, t]
  );

  function ErrorHandler({value, error}: {value: string; error?: FieldError}) {
    if (error?.message) {
      if (error.message === t('infos.checkingEns')) {
        return (
          <AlertInline
            message={t('infos.checkingEns') as string}
            variant="info"
          />
        );
      } else {
        return (
          <AlertInline message={error.message as string} variant="critical" />
        );
      }
    } else {
      if (value) {
        return (
          <AlertInline
            message={t('infos.ensAvailable') as string}
            variant="success"
          />
        );
      } else return null;
    }
  }

  return (
    <GridLayout>
      <div className="col-span-full flex flex-col gap-y-10 xl:col-start-3 xl:col-end-11">
        {/* Name */}
        <FormItem>
          <Label label="Name your DAO" />

          <Controller
            name="daoName"
            control={control}
            defaultValue=""
            rules={{
              required: t('errors.required.name'),
            }}
            render={({
              field: {onBlur, onChange, value, name},
              fieldState: {error},
            }) => (
              <>
                <TextInput
                  {...{name, value, onBlur, onChange}}
                  placeholder="Type"
                />
                <InputDetails>
                  <Help>{t('createDAO.step2.nameSubtitle')}</Help>
                  <InputCount>{`${value.length}/128`}</InputCount>
                </InputDetails>
                {error?.message && (
                  <AlertInline message={error.message} variant="critical" />
                )}
              </>
            )}
          />
        </FormItem>

        {/* ENS Ens Name */}
        {!isSettingPage && supportsENS && (
          <FormItem>
            <Label label={t('labels.daoEnsName')} />

            <Controller
              name="daoEnsName"
              control={control}
              defaultValue=""
              rules={{
                required: t('errors.required.ensName'),
                validate: value =>
                  isDaoEnsNameValid(
                    value,
                    provider,
                    setError,
                    clearErrors,
                    getValues
                  ),
              }}
              render={({
                field: {onBlur, onChange, value, name},
                fieldState: {error},
              }) => (
                <>
                  <TextInput
                    {...{
                      name,
                      value,
                      onBlur,
                      onChange: event => {
                        event.target.value = event.target.value.toLowerCase();
                        onChange(event);
                      },
                    }}
                    placeholder={t('placeHolders.ensName')}
                    rightAdornment={
                      <div className="flex h-full items-center rounded-r-xl bg-neutral-50 px-4">
                        .dao.nfn
                      </div>
                    }
                  />
                  <InputDetails>
                    <Help>{t('createDAO.step2.ensNameSubtitle')}</Help>
                    <InputCount>{`${value.length}/128`}</InputCount>
                  </InputDetails>
                  <ErrorHandler {...{value, error}} />
                </>
              )}
            />
          </FormItem>
        )}

        {/* Logo */}
        <FormItem>
          <Label
            label={t('labels.logo')}
            isOptional
            tagLabel={t('labels.optional')}
          />

          <Controller
            name="daoLogo"
            control={control}
            render={({field: {value, onChange}, fieldState: {error}}) => {
              let preview = '';

              try {
                // in case url does not need to be created
                if (URL_PATTERN.test(value) || value?.startsWith?.('blob')) {
                  preview = value;
                } else {
                  preview = value ? URL.createObjectURL(value) : '';
                }
              } catch (error) {
                console.error(error);
              }

              return (
                <>
                  <LogoContainer>
                    <InputImageSingle
                      {...{DAO_LOGO, preview}}
                      maxFileSize={DAO_LOGO.maxFileSize}
                      onError={handleImageError}
                      onChange={onChange}
                      acceptableFileFormat="image/jpg, image/jpeg, image/png, image/gif"
                      onlySquare
                    />
                  </LogoContainer>
                  <InputDetails>
                    <Help>{t('createDAO.step2.logoSubtitle')}</Help>
                  </InputDetails>
                  {error?.message && (
                    <AlertInline message={error.message} variant="critical" />
                  )}
                </>
              );
            }}
          />
        </FormItem>

        {/* Summary */}
        <FormItem>
          <Label label={t('labels.description')} />
          <Controller
            name="daoSummary"
            rules={{
              required: t('errors.required.summary'),
              validate: value =>
                isOnlyWhitespace(value) ? t('errors.required.summary') : true,
            }}
            control={control}
            render={({field, fieldState: {error}}) => (
              <>
                <TextareaSimple
                  {...field}
                  placeholder={t('placeHolders.daoDescription')}
                />

                <InputDetails>
                  <Help>{t('createDAO.step2.descriptionSubtitle')}</Help>
                </InputDetails>
                {error?.message && (
                  <AlertInline message={error.message} variant="critical" />
                )}
              </>
            )}
          />
        </FormItem>

        {/* Links */}
        <FormItem>
          <Label label={t('labels.links')} isOptional />
          <AddLinks arrayName={arrayName} bgWhite={bgWhite} />
          <InputDetails>
            <Help>{t('createDAO.step2.linksSubtitle')}</Help>
          </InputDetails>
        </FormItem>
      </div>
    </GridLayout>
  );
};

export default DefineMetadata;

const InputDetails = styled.div.attrs({
  className: 'flex items-start justify-between gap-x-10',
})``;

const InputCount = styled.div.attrs({
  className: 'ft-text-sm',
})``;

const FormItem = styled.div.attrs({
  className: 'space-y-3',
})``;

const LogoContainer = styled.div.attrs({
  className: 'pt-1',
})``;
