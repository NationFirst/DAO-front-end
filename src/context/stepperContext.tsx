import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type UpdateContextPayload = Partial<Omit<StepperContext, 'updateContext'>>;

type StepperContext = {
  currentStep?: number;
  totalSteps?: number;
  show?: boolean;
  updateContext: (value: UpdateContextPayload) => void;
};

const StepperContext = createContext<StepperContext>({} as StepperContext);

const StepperProvider: FC<PropsWithChildren> = ({children}) => {
  const [data, setData] = useState<Omit<StepperContext, 'updateContext'>>({});

  const updateContext = useCallback((value: UpdateContextPayload) => {
    setData(prev => ({...prev, ...value}));
  }, []);

  const value = useMemo(
    (): StepperContext => ({
      ...data,
      updateContext,
    }),
    [data, updateContext]
  );

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  );
};

const useStepperContext = () => useContext(StepperContext);

export {StepperProvider, useStepperContext};
