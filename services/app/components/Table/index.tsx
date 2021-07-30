import {
  createStyles,
  Radio,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import React from 'react';

const StyledTableRow = withStyles(theme =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

interface TableProps {
  useRadio?: boolean;
  radioValue?: string;
  onRadioChange?: (
    val: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  columns: string[];
  data: (string | number)[][];
  getDataId?: (d: (string | number)[]) => string;
}

function Table({
  columns,
  data,
  useRadio,
  radioValue,
  onRadioChange,
  getDataId = d => String(d[0]),
}: TableProps): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onRadioChange) {
      onRadioChange(event.target.value, event);
    }
  };
  return (
    <TableContainer>
      <MuiTable>
        <TableHead>
          <TableRow>
            {useRadio && <TableCell padding="checkbox"></TableCell>}
            {columns.map(column => (
              <TableCell key={column} align="center">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(d => {
            const dataId = getDataId(d);
            return (
              <StyledTableRow key={dataId}>
                {useRadio && (
                  <TableCell padding="checkbox">
                    <Radio
                      checked={radioValue === dataId}
                      onChange={handleChange}
                      value={dataId}
                      name="table-radio-demo"
                    />
                  </TableCell>
                )}
                {d.map((item, index) => (
                  <TableCell key={index} align="center">
                    {item}
                  </TableCell>
                ))}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;
