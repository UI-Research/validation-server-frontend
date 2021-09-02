import { Fragment, useState } from 'react';
import getReleaseId from '../../util/getReleaseId';
import ReviewRefineAccordion, {
  ReviewRefineAccordionProps,
} from './ReviewRefineAccordion';

interface ReviewRefineAccordionGroupProps
  extends Omit<
    ReviewRefineAccordionProps,
    'added' | 'epsilon' | 'onAddEpsilon' | 'selectedEpsilons'
  > {
  releaseQueue: string[];
}
function ReviewRefineAccordionGroup({
  releaseQueue,
  ...props
}: ReviewRefineAccordionGroupProps): JSX.Element {
  // Keep track of what epsilons (i.e. privacy_budget_used) we are displaying for this group of accordions.
  const [epsilons, setEpsilons] = useState<string[]>(['1.00']);

  const handleAddEpsilon = (val: string) => {
    setEpsilons(arr => {
      if (!arr.includes(val)) {
        return [...arr, val];
      } else {
        return arr;
      }
    });
  };

  return (
    <Fragment>
      {epsilons.map(ep => (
        <ReviewRefineAccordion
          key={ep}
          {...props}
          added={releaseQueue.includes(
            getReleaseId(props.command.command_id, ep),
          )}
          epsilon={ep}
          onAddEpsilon={handleAddEpsilon}
          selectedEpsilons={epsilons}
        />
      ))}
    </Fragment>
  );
}

export default ReviewRefineAccordionGroup;
