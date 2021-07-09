import { useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import { steps } from '../components/Steps/steps';
import StepsContent from '../components/Steps/StepsContent';
import StepsNav from '../components/StepsNav/StepsNav';

const title = 'Home';

function HomePage(): JSX.Element {
  const [activeStep, setActiveStep] = useState(steps[0].id);

  const handleSetStep = (id: string) => {
    setActiveStep(id);
    // TODO: scroll back to the top of the content on step update.
  };

  return (
    <PageTemplate
      title={title}
      topContent={
        <StepsNav activeStep={activeStep} onStepClick={setActiveStep} />
      }
    >
      <StepsContent activeStep={activeStep} onSetStep={handleSetStep} />
    </PageTemplate>
  );
}

export default HomePage;
