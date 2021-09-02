import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useState } from 'react';
import Divider from '../Divider';
import Table from '../Table';
import UIButton from '../UIButton';

interface RefineAdjustmentsDialogProps {
  accuracyData: Array<{ [key: string]: string | number }>;
  onDialogClose: () => void;
  showDialog: boolean;
}

function RefineAdjustmentsDialog({
  accuracyData,
  onDialogClose,
  showDialog,
}: RefineAdjustmentsDialogProps): JSX.Element {
  const [radioVal, setRadioVal] = useState<string>();
  const columns = Object.keys(accuracyData[0]);

  // Event handlers
  const handleDialogClose = () => {
    onDialogClose();
  };
  const handleAddClick = () => {
    // TODO
  };

  return (
    <Dialog open={showDialog} onClose={handleDialogClose}>
      <DialogTitle>Refine Adjustments</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select other RMSE and privacy budget combinations
        </DialogContentText>
        <Divider />
        <div style={{ paddingBottom: '1rem' }}>
          <Table
            columns={columns}
            data={accuracyData}
            useRadio={true}
            radioValue={radioVal}
            onRadioChange={setRadioVal}
          />
        </div>
        <UIButton
          disabled={!radioVal}
          onClick={handleAddClick}
          title="Add new version"
          icon="Add"
        />
      </DialogContent>
    </Dialog>
  );
}

export default RefineAdjustmentsDialog;
