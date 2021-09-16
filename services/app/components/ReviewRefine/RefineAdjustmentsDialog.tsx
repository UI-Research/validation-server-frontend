import {
  createStyles,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle as MuiDialogTitle,
  Grid,
  IconButton,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';
import { ConfidentialDataResult } from '../context/ApiContext/queries/confidentialData';
import Divider from '../Divider';
import Table from '../Table';
import UIButton from '../UIButton';
import getAccuracyData, {
  AccuracyData,
  Columns,
  getErrorVal,
} from './getAccuracyData';
import RefineAdjustmentsChart from './RefineAdjustmentsChart';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2, 3),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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

  const data = getAccuracyData(confidentialDataResults);
  const tableData = getTableData(data);
  const columns = [Columns.PRIVACY_ERROR, Columns.PRIVACY_COST];

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
    <Dialog
      maxWidth="lg"
      fullWidth={true}
      open={showDialog}
      onClose={handleDialogClose}
      aria-labelledby="refine-adjustments-dialog-title"
    >
      <DialogTitle
        id="refine-adjustments-dialog-title"
        onClose={handleDialogClose}
      >
        Refine Adjustments
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select other privacy cost and privacy budget combinations
        </DialogContentText>
        <Divider />
        <Grid container={true} spacing={2}>
          <Grid item={true} md={6}>
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
          </Grid>
          <Grid item={true} md={6}>
            <RefineAdjustmentsChart data={data} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

type TableData = {
  id: number;
  [Columns.PRIVACY_ERROR]: string;
  [Columns.PRIVACY_COST]: string;
};
function getTableData(data: AccuracyData[]): TableData[] {
  return data.map(d => {
    return {
      ...d,
      [Columns.PRIVACY_ERROR]: getErrorVal(d[Columns.PRIVACY_ERROR]),
    };
  });
}

export default RefineAdjustmentsDialog;
