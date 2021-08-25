import { useState } from 'react';
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
  const [queue, setQueue] = useState<number[]>([]);

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

    window.scrollTo(0, 0);
  };

  const handleCommandToggle = (commandId: number): void => {
    if (queue.includes(commandId)) {
      setQueue(arr => arr.filter(c => c !== commandId));
    } else {
      setQueue(arr => [...arr, commandId]);
    }
  };

  return (
    <PageTemplate
      title={title}
      topContent={
        <StepsNav
          activeStep={stepData.activeStep}
          steps={stepData.steps}
          onStepClick={handleSetStep}
        />
      }
    >
      <StepsContent
        activeStep={stepData.activeStep}
        onSetStep={handleSetStep}
        refinementQueue={queue}
        onCommandToggle={handleCommandToggle}
      />
    </PageTemplate>
  );
}

export default HomePage;
