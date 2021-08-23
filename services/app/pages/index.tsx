import { useContext, useEffect, useState } from 'react';
import ApiContext from '../components/context/ApiContext';
import PageTemplate from '../components/PageTemplate';
import { steps } from '../components/Steps/steps';
import StepsContent from '../components/Steps/StepsContent';
import StepsNav, { StepData } from '../components/StepsNav/StepsNav';

const title = 'Home';

const defaultActiveStep = steps[0].id;
const defaultStepData: StepData[] = steps.map(step => ({
  ...step,
  locked: step.id === defaultActiveStep ? undefined : true,
}));

interface FullStepData {
  steps: StepData[];
  activeStep: string;
}

function HomePage(): JSX.Element {
  const [stepData, setStepData] = useState<FullStepData>({
    steps: defaultStepData,
    activeStep: defaultActiveStep,
  });
  const { token } = useContext(ApiContext);

  const handleSetStep = (id: string) => {
    if (id === stepData.activeStep) {
      // If the currently active step was clicked, do not do anything.
      return;
    }
    setStepData(state => ({
      steps: state.steps.map(step => ({
        ...step,
        locked: step.locked === undefined ? undefined : false,
      })),
      activeStep: id,
    }));
    // TODO: scroll back to the top of the content on step update.
  };

  return (
    <PageTemplate
      title={title}
      topContent={
        token && (
          <StepsNav
            activeStep={stepData.activeStep}
            steps={stepData.steps}
            onStepClick={handleSetStep}
          />
        )
      }
    >
      {token ? (
        <StepsContent
          activeStep={stepData.activeStep}
          onSetStep={handleSetStep}
        />
      ) : (
        <div>NO TOKEN</div>
      )}
    </PageTemplate>
  );
}

export default HomePage;
