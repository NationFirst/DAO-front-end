import React from 'react';
import styled from 'styled-components';
import {ButtonWallet} from '@aragon/ods-old';
import {useTranslation} from 'react-i18next';
import {Link, useNavigate} from 'react-router-dom';

import {useWallet} from 'hooks/useWallet';
import Logo from 'assets/images/mainLogo.png';
import {useGlobalModalContext} from 'context/globalModals';
import {Container, GridLayout} from 'components/layout';
import {navLinks} from 'utils/constants';

const ExploreNav: React.FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {address, ensName, ensAvatarUrl, isConnected, methods} = useWallet();
  const {open} = useGlobalModalContext();

  const path = t('logo.linkURL');

  const navigateHome = () => {
    navigate(path);
  };

  const handleWalletButtonClick = () => {
    if (isConnected) {
      open('wallet');
      return;
    }

    methods.selectWallet().catch((err: Error) => {
      // To be implemented: maybe add an error message when
      // the error is different from closing the window
      console.error(err);
    });
  };

  return (
    <Container data-testid="navbar">
      <Menu>
        <GridLayout>
          <Content>
            <LeftContent>
              {navLinks.map(link => (
                <Link
                  to={link.href}
                  className="text-neutral-0"
                  key={link.title}
                >
                  {link.title}
                </Link>
              ))}
            </LeftContent>
            <LogoContainer onClick={navigateHome} src={Logo} />
            <RightContent>
              <ActionsWrapper>
                <ButtonWallet
                  src={ensAvatarUrl || address}
                  onClick={handleWalletButtonClick}
                  isConnected={isConnected}
                  label={
                    isConnected
                      ? ensName || address
                      : t('navButtons.connectWallet')
                  }
                />
              </ActionsWrapper>
            </RightContent>
          </Content>
        </GridLayout>
      </Menu>
    </Container>
  );
};

const Menu = styled.nav.attrs({
  className: 'py-4 xl:py-6 backdrop-blur-xl bg-primary-500/50',
})``;

const Content = styled.div.attrs({
  className: 'col-span-full flex grid grid-cols-[auto_auto] lg:grid-cols-3',
})``;

const LeftContent = styled.div.attrs({
  className: 'flex items-center gap-9 max-lg:hidden',
})``;

const LogoContainer = styled.img.attrs({
  className: 'w-48 min-w-48 cursor-pointer lg:mx-auto',
})``;

const RightContent = styled.div.attrs({
  className: 'flex flex-row-reverse justify-between items-center',
})``;

const ActionsWrapper = styled.div.attrs({
  className: 'flex space-x-3 md:space-x-6 items-center',
})``;

export default ExploreNav;
