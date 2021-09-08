import { SyntheticDataResult } from '../../context/ApiContext/queries/syntheticDataResult';
import DataResultDisplay from './DataResultDisplay';

interface SyntheticDataDisplayProps {
  syntheticDataResult: SyntheticDataResult;
}
function SyntheticDataDisplay({
  syntheticDataResult,
}: SyntheticDataDisplayProps): JSX.Element | null {
  return (
    <DataResultDisplay
      item={syntheticDataResult}
      label="Results with Synthetic Data:"
    />
  );
}

export default SyntheticDataDisplay;
