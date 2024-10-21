import React from 'react';
import {styled} from 'styled-components';

export type WizardProps = {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  descriptionLink?: string;
  includeStepper?: boolean;
  processName?: string;
  currentStep?: number;
  totalSteps?: number;
  nav: React.ReactNode;
  renderHtml?: boolean;
};

export const Wizard: React.FC<WizardProps> = ({
  processName,
  currentStep,
  totalSteps,
  title,
  description,
  descriptionLink,
  includeStepper = true,
  nav,
}) => {
  return (
    <StepCard data-testid="wizard">
      <div className="xl:hidden">{nav}</div>
      {/*Stepper*/}
      {/*{includeStepper && (*/}
      {/*  <Wrapper>*/}
      {/*    <CenteredFlex>*/}
      {/*      <p className="font-semibold text-neutral-800 xl:text-primary-500">*/}
      {/*        {processName}*/}
      {/*      </p>*/}
      {/*      <p className="text-neutral-400">*/}
      {/*        Step {currentStep} of {totalSteps}*/}
      {/*      </p>*/}
      {/*    </CenteredFlex>*/}
      {/*    <LinearProgress max={totalSteps} value={currentStep} />*/}
      {/*  </Wrapper>*/}
      {/*)}*/}

      {/* Main */}
      <Wrapper>
        <StepTitle>{title}</StepTitle>

        <StepSubTitle>{description}</StepSubTitle>
        {/* {!!descriptionLink && (
          <div className="max-w-fit">
            <Button
              className="mt-4"
              size="md"
              iconRight={IconType.LINK_EXTERNAL}
              variant="secondary"
              href={descriptionLink}
              target="_blank"
            >
              {t('navLinks.guide')}
            </Button>
          </div>
        )} */}
      </Wrapper>
    </StepCard>
  );
};

const StepCard = styled.div.attrs({
  className: 'flex flex-col gap-10',
})``;

const Wrapper = styled.div.attrs({
  className: 'space-y-2',
})``;

const StepTitle = styled.p.attrs({
  className: 'ft-text-3xl text-neutral-800 font-semibold mb-2',
})``;

const StepSubTitle = styled.span.attrs({
  className: 'text-neutral-600 ft-text-lg',
})`
  & > a {
    color: #003bf5;
    font-weight: 700;
  }
`;

const CenteredFlex = styled.div.attrs({
  className: 'flex justify-between text-sm xl:text-base leading-normal',
})``;
