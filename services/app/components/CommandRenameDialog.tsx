import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { FormEventHandler, useRef } from 'react';
import {
  CommandResponseResult,
  useCommandPatch,
} from './context/ApiContext/queries/command';
import UIButton from './UIButton';

interface CommandRenameDialogProps {
  command: CommandResponseResult;
  onDialogClose: () => void;
  showDialog: boolean;
}

function CommandRenameDialog({
  command,
  onDialogClose,
  showDialog,
}: CommandRenameDialogProps): JSX.Element {
  const commandPatchResult = useCommandPatch({
    onSuccess: () => {
      // On success event, we want to close the dialog.
      onDialogClose();
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRenameSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (inputRef.current) {
      commandPatchResult.mutate({
        command_id: command.command_id,
        command_name: inputRef.current.value,
      });
    }
  };

  const handleDialogClose = () => {
    // Upon closing the dialog outside the onSuccess event,
    // reset the command patch result to avoid lingering errors.
    onDialogClose();
    commandPatchResult.reset();
  };

  return (
    <Dialog
      open={showDialog}
      onClose={handleDialogClose}
      aria-labelledby="command-rename-dialog-title"
    >
      <form onSubmit={handleRenameSubmit}>
        <DialogTitle id="command-rename-dialog-title">
          Rename command
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a new unique ID for this command.
          </DialogContentText>
          <TextField
            autoFocus={true}
            margin="dense"
            id="name"
            label="Command name"
            type="text"
            defaultValue={command.command_name}
            fullWidth={true}
            inputRef={inputRef}
            required={true}
            error={commandPatchResult.isError}
            helperText={
              commandPatchResult.isError &&
              'Command name should be unique in your set.'
            }
          />
        </DialogContent>
        <DialogActions>
          <UIButton onClick={handleDialogClose} title="Cancel" />
          <UIButton title="Submit" type="submit" />
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CommandRenameDialog;
