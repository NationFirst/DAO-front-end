import React, {useEffect} from 'react';
import styled from 'styled-components';
import {SupportedNetworks as SdkSupportedNetworks} from '@aragon/osx-commons-configs';

import {GridLayout} from 'components/layout';
import Hero from 'containers/hero';
import {useNetwork} from 'context/network';
import {translateToNetworkishName} from 'utils/library';
import CreateDaoCard from 'components/createDaoCard';

export const Explore: React.FC = () => {
  const {network, setNetwork} = useNetwork();

  useEffect(() => {
    const translatedNetwork = translateToNetworkishName(
      network
    ) as SdkSupportedNetworks;

    // when network not supported by the SDK, don't set network
    if (!Object.values(SdkSupportedNetworks).includes(translatedNetwork)) {
      console.warn('Unsupported network, defaulting to nationsfirst');
      setNetwork('nationsfirst');
    }
  }, [network, setNetwork]);

  return (
    <Wrapper>
      <GridLayout>
        <ContentWrapper>
          <Hero />
          <CreateDaoCard />
        </ContentWrapper>
      </GridLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs({
  className: 'my-auto py-10',
})``;

const ContentWrapper = styled.div.attrs({
  className: 'col-span-full grid grid-cols-1 lg:grid-cols-2 gap-28 items-end',
})``;
