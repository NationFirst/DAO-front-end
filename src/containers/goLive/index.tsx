import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';
import {Breadcrumb} from '@aragon/ods-old';
import {AlertCard} from '@aragon/ods';
import {useNavigate} from 'react-router-dom';

import Blockchain from './blockchain';
import DaoMetadata from './daoMetadata';
import Community from './community';
import Governance from './governance';
import {Landing} from 'utils/paths';
import {useWallet} from 'hooks/useWallet';
import {useGlobalModalContext} from 'context/globalModals';
import {trackEvent} from 'services/analytics';
import Committee from './committee';
import {CreateDaoDialog} from 'containers/createDaoDialog';
import {GridLayout} from 'components/layout';
import Button from 'components/buttons/button';
import Arrow from 'assets/icons/arrow';

export const GoLiveHeader: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const clickHandler = (path: string) => {
    navigate(path);
  };

  return (
    <div className="md:rounded-xl">
      <div className="xl:hidden">
        <Breadcrumb
          crumbs={{label: t('createDAO.title'), path: Landing}}
          onClick={clickHandler}
        />
      </div>
      <div className="w-full max-xl:pt-10">
        <h1 className="text-4xl font-semibold leading-tight text-neutral-800">
          Launch Your <span className="font-semibold text-accent">DAO</span>
        </h1>
        <p className="mt-2 text-xl leading-normal text-neutral-600">
          {t('createDAO.review.description')}
        </p>
      </div>
    </div>
  );
};

const GoLive: React.FC = () => {
  const {t} = useTranslation();
  const {getValues} = useFormContext();

  const {votingType} = getValues();

  return (
    <GridLayout>
      <div className="col-span-full flex flex-col gap-y-10 divide-y-3 divide-neutral-100 xl:col-start-3 xl:col-end-11">
        <Blockchain />
        <DaoMetadata />
        <Community />
        <Governance />
        {votingType === 'gasless' && <Committee />}
        <AlertCard
          className="!border-3 !border-primary-50 shadow-none"
          message={t('createDAO.review.daoUpdates')}
          variant="info"
        />
      </div>
    </GridLayout>
  );
};

export const GoLiveFooter: React.FC = () => {
  const {watch, setValue, getValues} = useFormContext();
  const {reviewCheck} = watch();
  const {open} = useGlobalModalContext();
  const {isConnected, provider, isOnWrongNetwork} = useWallet();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isButtonDisabled = !Object.values(reviewCheck).every(v => v === true);

  const publishDao = (e: React.MouseEvent) => {
    e.stopPropagation();
    isConnected &&
      trackEvent('daoCreation_publishYourDAO_clicked', {
        network: getValues('blockchain')?.network,
        wallet_provider: provider?.connection.url,
        governance_type: getValues('membership'),
      });

    if (isConnected) {
      if (isOnWrongNetwork) {
        open('network');
      } else {
        setIsDialogOpen(true);
      }
    } else {
      open('wallet');
    }
  };

  const showInvalidFields = () => {
    if (isButtonDisabled) {
      setValue('reviewCheckError', true);
    }
  };

  return (
    <div className="flex justify-center pt-6">
      <div onClick={showInvalidFields}>
        <Button
          onClick={publishDao}
          iconRight={<Arrow />}
          variant="fill"
          disabled={isButtonDisabled}
        >
          LAUNCH DAO
        </Button>
        <CreateDaoDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </div>
  );
};

export default GoLive;
