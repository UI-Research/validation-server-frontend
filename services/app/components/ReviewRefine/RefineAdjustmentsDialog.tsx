import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useState } from 'react';
import { ConfidentialDataResult } from '../context/ApiContext/queries/confidentialData';
import Divider from '../Divider';
import Table from '../Table';
import UIButton from '../UIButton';

interface RefineAdjustmentsDialogProps {
  confidentialDataResults: ConfidentialDataResult[];
  onAddVersionClick: (id: number) => void;
  onDialogClose: () => void;
  selectedRuns: number[];
  showDialog: boolean;
}

function RefineAdjustmentsDialog({
  confidentialDataResults,
  onAddVersionClick,
  onDialogClose,
  selectedRuns,
  showDialog,
}: RefineAdjustmentsDialogProps): JSX.Element {
  const [radioVal, setRadioVal] = useState<string>();

  const tableData = getTableData(confidentialDataResults);
  const columns = ['Accuracy', 'Privacy cost'];

  // Event handlers
  const handleDialogClose = () => {
    onDialogClose();
  };
  const handleAddVersionClick = () => {
    if (radioVal) {
      onAddVersionClick(Number(radioVal));
      setRadioVal(undefined);
    }
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
            data={tableData}
            getDataId={d => String(d.id)}
            // Do not show radio inputs for run IDs that have already been selected.
            noRadioOptions={selectedRuns.map(String)}
            useRadio={true}
            radioValue={radioVal}
            onRadioChange={setRadioVal}
          />
        </div>
        <UIButton
          disabled={!radioVal}
          onClick={handleAddVersionClick}
          title="Add new version"
          icon="Add"
        />
      </DialogContent>
    </Dialog>
  );
}

interface ParsedAccuracy {
  accuracy: number;
  quantiles: number;
}
function getTableData(data: ConfidentialDataResult[]) {
  // For each item, get the 0.5 quantile.
  return data
    .map(d => {
      const accuracyItem = (JSON.parse(d.accuracy) as ParsedAccuracy[]).find(
        a => a.quantiles === 0.5,
      );
      return {
        id: d.run_id,
        Accuracy: accuracyItem?.accuracy || '',
        'Privacy cost': d.privacy_budget_used,
      };
    })
    .sort((a, b) => Number(a['Privacy cost']) - Number(b['Privacy cost']));
}

export default RefineAdjustmentsDialog;
