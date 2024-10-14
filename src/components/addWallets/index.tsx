import {Button, IconType, Dropdown} from '@aragon/ods';
import React, {useEffect, useRef} from 'react';
import {useFieldArray, useFormContext, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import {useEnsName} from 'wagmi';
import {Address} from 'viem';

import {useAlertContext} from 'context/alert';
import {useNetwork} from 'context/network';
import {useWallet} from 'hooks/useWallet';
import {CHAIN_METADATA} from 'utils/constants';
import Footer from './footer';
import Header from './header';
import Row from './row';
import ButtonForm from '../buttons/buttonForm';
import {ThreeDots} from '../../assets/icons/threeDots';

const AddWallets: React.FC = () => {
  const {t} = useTranslation();
  const {alert} = useAlertContext();
  const appendConnectedAddress = useRef<boolean>(true);

  const {network} = useNetwork();
  const {address} = useWallet();

  const {data: ensName} = useEnsName({
    address: address as Address,
    chainId: CHAIN_METADATA[network].id,
  });

  const {control, setValue, resetField, trigger} = useFormContext();
  const wallets = useWatch({name: 'wallets', control: control});
  const {fields, append, remove} = useFieldArray({
    name: 'wallets',
    control,
  });

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...(wallets && {...wallets[index]}),
    };
  });

  useEffect(() => {
    if (
      address &&
      controlledFields?.length === 0 &&
      appendConnectedAddress.current
    ) {
      append({address, amount: '1', ensName});
      appendConnectedAddress.current = false;
      setTimeout(() => {
        trigger('wallets.0');
      }, 50);
    }
  }, [address, append, controlledFields?.length, ensName, trigger]);

  const resetDistribution = () => {
    controlledFields.forEach((_, index) => {
      setValue(`wallets.${index}.amount`, '1');
    });
    trigger('wallets');
    resetField('eligibilityTokenAmount');
    alert(t('alert.chip.distributionReset'));
  };

  // setTimeout added because instant trigger not working
  const handleAddWallet = () => {
    append({address: '', ensName: '', amount: '1'});
    setTimeout(() => {
      trigger(`wallets.${controlledFields.length}`);
    }, 50);
  };

  const handleDeleteRow = (index: number) => {
    remove(index);
    setTimeout(() => {
      trigger('wallets');
    }, 50);
  };

  return (
    <Container data-testid="add-wallets">
      <ListGroup>
        <Header />
        {controlledFields.map((field, index) => {
          return (
            <Row
              key={field.id}
              index={index}
              // Replace when minting to treasury is supported
              // {...(index !== 0 ? {onDelete: () => remove(index)} : {})}
              onDelete={handleDeleteRow}
            />
          );
        })}
        <Footer totalAddresses={fields.length || 0} />
      </ListGroup>
      <ActionsWrapper>
        <ButtonForm onClick={handleAddWallet}>
          {t('labels.addWallet')}
        </ButtonForm>
        <Dropdown.Container
          align="start"
          customTrigger={
            <ButtonForm iconLeft={<ThreeDots className="text-primary-400" />} />
          }
        >
          <Dropdown.Item onClick={resetDistribution}>
            {t('labels.resetDistribution')}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              remove();
              setValue('tokenTotalSupply', 0);
              resetField('eligibilityTokenAmount');
              alert(t('alert.chip.removedAllAddresses'));
            }}
          >
            {t('labels.deleteAllAddresses')}
          </Dropdown.Item>
        </Dropdown.Container>
      </ActionsWrapper>
    </Container>
  );
};

export default AddWallets;

const Container = styled.div.attrs({className: 'space-y-3'})``;

const ListGroup = styled.div.attrs({
  className: 'flex flex-col space-y-3 rounded-xl',
})``;

const ActionsWrapper = styled.div.attrs({
  className: 'flex justify-between',
})``;
