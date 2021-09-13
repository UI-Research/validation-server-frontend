import SpreadsheetTable from '../../SpreadsheetTable';
import AccordionContentTitle from './AccordionContentTitle';

interface DataResultModel {
  result: {
    ok: boolean;
    data: string;
    error?: string;
  };
}
interface DataResultDisplayProps {
  item: DataResultModel;
  label: string;
}
function DataResultDisplay({
  item,
  label,
}: DataResultDisplayProps): JSX.Element | null {
  const data: Array<{ [key: string]: string | number }> | false =
    item.result.ok && JSON.parse(item.result.data);

  if (!data) {
    return null;
  }

  return (
    <div>
      <AccordionContentTitle>{label}</AccordionContentTitle>
      <div>
        <SpreadsheetTable columns={Object.keys(data[0])} data={data} />
      </div>
    </div>
  );
}

export default DataResultDisplay;
