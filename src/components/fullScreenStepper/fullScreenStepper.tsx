import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Breadcrumb, togglePageOverflow, Wizard} from '@aragon/ods-old';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import cls from 'classnames';

import ExitProcessMenu, {ProcessType} from 'containers/exitProcessMenu';
import {useStepper} from 'hooks/useStepper';
import {StepProps} from './step';
import Button from '../buttons/button';
import Arrow from '../../assets/icons/arrow';
import {useStepperContext} from '../../context/stepperContext';

export type FullScreenStepperProps = {
  navLabel: string;
  returnPath: string;
  processType?: ProcessType; // if no process type, don't use warning
  wizardProcessName: string;
  children: React.FunctionComponentElement<StepProps>[];
};

type FullScreenStepperContextType = {
  currentStep: number;
  setStep: (newStep: number) => void;
  prev: () => void;
  next: () => void;
};

const FullScreenStepperContext = createContext<
  FullScreenStepperContextType | undefined
>(undefined);

export const useFormStep = () =>
  useContext(FullScreenStepperContext) as FullScreenStepperContextType;

export const FullScreenStepper: React.FC<FullScreenStepperProps> = ({
  wizardProcessName,
  processType,
  children,
  navLabel,
  returnPath,
}) => {
  const skipSteps = children.filter(child => child.props.skipStep !== true);
  const {updateContext: updateStepperContext} = useStepperContext();

  const navigate = useNavigate();

  const [showExitProcessMenu, setShowExitProcessMenu] = useState(false);
  const {currentStep, prev, next, setStep} = useStepper(skipSteps.length);

  const currentIndex = currentStep - 1;
  const {
    includeStepper = true,
    wizardTitle,
    wizardDescription,
    wizardDescriptionLink,
    hideWizard,
    fullWidth,
    customHeader,
    customFooter,
    isNextButtonDisabled,
    onBackButtonClicked,
    onNextButtonClicked,
    onNextButtonDisabledClicked,
  } = skipSteps[currentIndex].props;

  const totalSteps = useMemo(() => {
    let total = 0;
    skipSteps.forEach((_, index) => {
      if (!skipSteps[index].props.hideWizard) total++;
    });
    return total;
  }, [skipSteps]);

  const previousHideWizards = useMemo(() => {
    let total = 0;
    for (let i = 0; i < currentStep; i++) {
      skipSteps[i].props.hideWizard && total++;
    }
    return total;
  }, [skipSteps, currentStep]);

  const value = {currentStep, setStep, prev, next};

  const currentFormStep = useMemo(() => {
    if (hideWizard) {
      return currentStep;
    } else {
      return currentStep - previousHideWizards;
    }
  }, [currentStep, hideWizard, previousHideWizards]);

  /*************************************************
   *                    Effects                    *
   *************************************************/

  useEffect(() => {
    updateStepperContext({
      currentStep: currentFormStep,
      totalSteps,
      show: !hideWizard,
    });
  }, [currentFormStep, totalSteps, hideWizard]);

  // Scroll Top each time the CurrentStep changed
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [currentStep]);

  /*************************************************
   *              Callbacks & Handlers             *
   *************************************************/
  const handleExitButtonClicked = useCallback(() => {
    if (processType) {
      setShowExitProcessMenu(true);
    } else {
      navigate(returnPath);
    }
  }, [processType, navigate, returnPath]);

  const exitProcess = useCallback(() => {
    setShowExitProcessMenu(false);
    togglePageOverflow(false);
    navigate(returnPath);
  }, [navigate, returnPath]);

  const handleButtonBack = () => {
    onBackButtonClicked ? onBackButtonClicked() : prev();
  };

  const handleButtonNext = () => {
    onNextButtonClicked ? onNextButtonClicked(next) : next();
  };

  /*************************************************
   *                     Render                    *
   *************************************************/
  return (
    <FullScreenStepperContext.Provider value={value}>
      <Layout>
        <div className="mt-6">
          {!hideWizard && (
            <Wizard
              includeStepper={includeStepper}
              processName={wizardProcessName}
              title={wizardTitle || ''}
              description={wizardDescription}
              descriptionLink={wizardDescriptionLink}
              totalSteps={totalSteps}
              currentStep={currentFormStep}
              renderHtml
              nav={
                <Breadcrumb
                  crumbs={{
                    label: navLabel,
                    path: returnPath,
                  }}
                  onClick={handleExitButtonClicked}
                />
              }
            />
          )}
          {customHeader &&
            React.cloneElement(customHeader, {
              onExitButtonClick: handleExitButtonClicked,
            })}
        </div>
        <FormLayout fullWidth={fullWidth || false}>
          {skipSteps[currentIndex]}
          {customFooter ? (
            <>{customFooter}</>
          ) : (
            <FormFooter>
              <Button
                variant="outline"
                onClick={handleButtonBack}
                disabled={currentStep === 1}
                iconLeft={<Arrow className="rotate-180" w={20} h={20} />}
              >
                BACK
              </Button>
              <ButtonValidationTrigger onClick={onNextButtonDisabledClicked}>
                <Button
                  variant="fill"
                  onClick={handleButtonNext}
                  disabled={isNextButtonDisabled}
                  iconRight={<Arrow w={20} h={20} />}
                >
                  NEXT
                </Button>
              </ButtonValidationTrigger>
            </FormFooter>
          )}
        </FormLayout>
      </Layout>
      {processType && (
        <ExitProcessMenu
          isOpen={showExitProcessMenu}
          onClose={() => setShowExitProcessMenu(false)}
          ctaCallback={exitProcess}
          processType={processType}
        />
      )}
    </FullScreenStepperContext.Provider>
  );
};

const Layout = styled.div.attrs({
  className: 'col-span-full font-medium text-neutral-600 flex flex-col',
})``;

type FormLayoutProps = {
  fullWidth: boolean;
};

const FormLayout = styled.div.attrs<{fullWidth: FormLayoutProps}>(
  ({fullWidth}) => ({
    className: cls(
      {'xl:w-3/5': !fullWidth},
      'mt-10 xl:mt-16 gap-y-14 flex-1 flex flex-col w-full mx-auto'
    ),
  })
)<FormLayoutProps>``;

const FormFooter = styled.div.attrs({
  className: 'flex justify-between mt-auto',
})``;

const ButtonValidationTrigger = styled.div``;
