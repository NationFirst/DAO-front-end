import {Breadcrumb} from '@aragon/ods-old';
import React from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import CardWithImage from 'components/cardWithImage';
import {useFormStep} from 'components/fullScreenStepper';
import {ActiveIndicator, Indicator, StyledCarousel} from 'containers/carousel';
import useScreen from 'hooks/useScreen';
import {trackEvent} from 'services/analytics';
import {i18n} from '../../../i18n.config';
import ButtonCreateDao from 'components/buttons/buttonCreateDao';
import CardImage from '../../components/cardWithImage/CardImage';

type OverviewDAOHeaderProps = {
  navLabel: string;
  returnPath: string;
  onExitButtonClick?: () => void;
};

export const OverviewDAOHeader: React.FC<OverviewDAOHeaderProps> = ({
  navLabel,
  returnPath,
  onExitButtonClick,
}) => {
  const {t} = useTranslation();

  return (
    <div>
      <div className="mb-6 xl:hidden">
        <Breadcrumb
          crumbs={{
            label: navLabel,
            path: returnPath,
          }}
          onClick={onExitButtonClick}
        />
      </div>

      <div className="mt-20 items-end md:flex md:space-x-12">
        <div className="w-full">
          <h1 className="font-semibold text-neutral-800 ft-text-3xl">
            Build Your <span className="font-semibold text-accent">DAO</span>
          </h1>
          <p className="mt-4 max-w-[50ch] text-neutral-600 ft-text-lg">
            {t('createDAO.overview.description')}
          </p>
        </div>
        <div className="mt-4 flex space-x-4 md:mt-0"></div>
      </div>
    </div>
  );
};

const OverviewCards = [
  <CardWithImage
    key="SelectBlockchain"
    imgSrc={<CardImage type="blockchain" height="h-48" />}
    caption={i18n.t('createDAO.step1.label')}
    title={i18n.t('createDAO.step1.title')}
  />,
  <CardWithImage
    key="DefineMetadata"
    imgSrc={<CardImage type="mission" height="h-48" />}
    caption={i18n.t('createDAO.step2.label')}
    title={i18n.t('createDAO.step2.title')}
  />,
  <CardWithImage
    key="SetupCommunity"
    imgSrc={<CardImage type="membership" height="h-48" />}
    caption={i18n.t('createDAO.step3.label')}
    title={i18n.t('createDAO.step3.title')}
  />,
  <CardWithImage
    key="ConfigureGovernance"
    imgSrc={<CardImage type="rules" height="h-48" />}
    caption={i18n.t('createDAO.step4.label')}
    title={i18n.t('createDAO.step4.title')}
  />,
];

export const OverviewDAOStep: React.FC = () => {
  const {isDesktop} = useScreen();
  const {next} = useFormStep();

  const handleSetupClick = () => {
    trackEvent('daoCreation_setupDAO_clicked');
    next();
  };

  if (isDesktop) {
    return (
      <div className="flex flex-col">
        <div className="space-y-4 md:flex md:space-x-4 md:space-y-0">
          {OverviewCards}
        </div>
        <CreateDaoButtonContainer>
          <ButtonCreateDao onClick={handleSetupClick} />
        </CreateDaoButtonContainer>
      </div>
    );
  }
  return (
    <MobileCTA>
      <StyledCarousel
        swipeable
        emulateTouch
        centerMode
        autoPlay
        preventMovementUntilSwipeScrollTolerance
        swipeScrollTolerance={100}
        interval={4000}
        showArrows={false}
        showStatus={false}
        transitionTime={300}
        centerSlidePercentage={92}
        showThumbs={false}
        infiniteLoop
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <ActiveIndicator
                aria-label={`Selected: ${label} ${index + 1}`}
                title={`Selected: ${label} ${index + 1}`}
              />
            );
          }
          return (
            <Indicator
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${label} ${index + 1}`}
              aria-label={`${label} ${index + 1}`}
            />
          );
        }}
      >
        {OverviewCards}
      </StyledCarousel>
    </MobileCTA>
  );
};

const MobileCTA = styled.div.attrs({
  className: 'mb-10 -mx-4 md:-mx-6 xl:mx-0',
})``;

const CreateDaoButtonContainer = styled.div.attrs({
  className: 'mt-20 self-end',
})``;
