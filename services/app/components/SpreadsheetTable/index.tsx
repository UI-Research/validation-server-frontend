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

interface SpreadsheetTableProps {
  columns: string[];
  data: (string | number)[][];
  getRowId?: (d: (string | number)[], i: number) => string;
}

const useStyles = makeStyles({
  container: {
    maxHeight: 250,
  },
});

function SpreadsheetTable({
  columns,
  data,
  getRowId = d => String(d[0]),
}: SpreadsheetTableProps): JSX.Element {
  const classes = useStyles();
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
          {data.map((row, index) => (
            <TableRow key={getRowId(row, index)}>
              <SpreadsheetHeaderCell variant="head" align="center">
                {index + 1}
              </SpreadsheetHeaderCell>
              {row.map((item, itemIndex) => (
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

export default SpreadsheetTable;
