import { ConfidentialDataResult } from '../../context/ApiContext/queries/confidentialData';
import DataResultDisplay from './DataResultDisplay';

interface ConfidentialDataDisplayProps {
  confidentialDataResult: ConfidentialDataResult;
}
function ConfidentialDataDisplay({
  confidentialDataResult,
}: ConfidentialDataDisplayProps): JSX.Element | null {
  return (
    <DataResultDisplay
      item={confidentialDataResult}
      label="Results with Confidential Data:"
    />
  );
}

export default ConfidentialDataDisplay;
