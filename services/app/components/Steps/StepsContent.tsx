import RequestRelease from '../RequestRelease/RequestRelease';
import ReviewRefine from '../ReviewRefine/ReviewRefine';
import UploadExplore from '../UploadExplore/UploadExplore';
import { steps } from './steps';

interface StepsContentProps {
  activeStep: string;
  onSetStep: (id: string) => void;
}
function StepsContent({
  activeStep,
  onSetStep,
}: StepsContentProps): JSX.Element | null {
  switch (activeStep) {
    case steps[0].id:
      return <UploadExplore onNextClick={() => onSetStep(steps[1].id)} />;
    case steps[1].id:
      return <ReviewRefine />;
    case steps[2].id:
      return <RequestRelease />;
    default:
      return null;
  }
}

export default StepsContent;
