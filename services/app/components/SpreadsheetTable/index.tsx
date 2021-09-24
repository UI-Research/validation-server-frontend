import {
  createStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';

const SpreadsheetTableCell = withStyles(theme =>
  createStyles({
    root: {
      border: `1px solid ${theme.palette.common.black}`,
    },
  }),
)(TableCell);

const SpreadsheetHeaderCell = withStyles(theme =>
  createStyles({
    root: {
      backgroundColor: theme.palette.action.hover,
    },
  }),
)(SpreadsheetTableCell);

interface KeyedData {
  [key: string]: string | number;
}

interface SpreadsheetTableProps {
  columns: string[];
  data: (string | number)[][] | KeyedData[];
}

const useStyles = makeStyles({
  container: {
    maxHeight: 250,
  },
});

const MAX_ROWS = 500;

function SpreadsheetTable({
  columns,
  data,
}: SpreadsheetTableProps): JSX.Element {
  const classes = useStyles();
  // Show only a certain amount of rows. Else, the browser gets slow.
  const rows = data.slice(0, MAX_ROWS);
  return (
    <TableContainer className={classes.container}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <SpreadsheetHeaderCell></SpreadsheetHeaderCell>
            {columns.map(column => (
              <SpreadsheetHeaderCell key={column} align="center">
                {column}
              </SpreadsheetHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <SpreadsheetHeaderCell variant="head" align="center">
                {index + 1}
              </SpreadsheetHeaderCell>
              {isKeyedData(row)
                ? columns.map(key => (
                    <SpreadsheetTableCell key={key} align="center">
                      {row[key]}
                    </SpreadsheetTableCell>
                  ))
                : row.map((item, itemIndex) => (
                    <SpreadsheetTableCell key={itemIndex} align="center">
                      {item}
                    </SpreadsheetTableCell>
                  ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function isKeyedData<T>(val: T | KeyedData): val is KeyedData {
  return !Array.isArray(val);
}

export default SpreadsheetTable;
