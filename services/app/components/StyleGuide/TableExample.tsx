import { useState } from 'react';
import Table from '../Table';

const data = [
  ['Frozen yogurt', 159, 6, 24, 4],
  ['Ice cream sandwich', 237, 9, 37, 4.3],
  ['Eclair', 262, 16, 24, 6],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16, 49, 3.9],
];

interface TableExampleProps {
  useRadio?: boolean;
}

function TableExample({ useRadio }: TableExampleProps): JSX.Element {
  const [selectedItem, setSelectedItem] = useState(String(data[0][0]));
  return (
    <Table
      columns={[
        'Dessert (100g serving)',
        'Calories',
        'Fat (g)',
        'Carbs (g)',
        'Protein (g)',
      ]}
      data={data}
      useRadio={useRadio}
      radioValue={selectedItem}
      onRadioChange={setSelectedItem}
    />
  );
}

export default TableExample;
