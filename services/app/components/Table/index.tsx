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

interface KeyedData {
  [key: string]: string | number;
}

const StyledTableRow = withStyles(theme =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

interface TableProps<E> {
  useRadio?: boolean;
  radioValue?: string;
  onRadioChange?: (
    val: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  columns: string[];
  data: E[];
  getDataId?: (d: E, i: number) => string;
  /** List of Data IDs that do not use a radio element. */
  noRadioOptions?: string[];
}

function Table<T extends (string | number)[] | KeyedData>({
  columns,
  data,
  useRadio,
  radioValue,
  onRadioChange,
  getDataId = (_, i) => String(i),
  noRadioOptions,
}: TableProps<T>): JSX.Element {
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
          {data.map((row, index) => {
            const dataId = getDataId(row, index);
            return (
              <StyledTableRow key={dataId}>
                {useRadio && (
                  <TableCell padding="checkbox">
                    {!noRadioOptions || !noRadioOptions.includes(dataId) ? (
                      <Radio
                        checked={radioValue === dataId}
                        onChange={handleChange}
                        value={dataId}
                        name="table-radio-demo"
                      />
                    ) : null}
                  </TableCell>
                )}
                {isKeyedData(row)
                  ? columns.map(key => (
                      <TableCell key={key} align="center">
                        {row[key]}
                      </TableCell>
                    ))
                  : row.map((item, itemIndex) => (
                      <TableCell key={itemIndex} align="center">
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

function isKeyedData<T>(val: T | KeyedData): val is KeyedData {
  return !Array.isArray(val);
}

export default Table;
