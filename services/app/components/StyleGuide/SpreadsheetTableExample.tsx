import SpreadsheetTable from '../SpreadsheetTable';

function SpreadsheetTableExample(): JSX.Element {
  return (
    <SpreadsheetTable
      columns={['income_category', 'mars', 'eic', 'count_s006']}
      data={[
        [10, 2, 1, 51602],
        [10, 2, 2, 33017],
        [10, 2, 3, 15642],
        [10, 4, 1, 281000],
        [10, 4, 2, 95537],
        [10, 4, 1, 481051],
        [10, 4, 2, 4727],
        [10, 4, 3, 81590],
      ]}
    />
  );
}

export default SpreadsheetTableExample;
