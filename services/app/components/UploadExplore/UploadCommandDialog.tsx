import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { FormEventHandler, useRef } from 'react';
import {
  CommandPostPayload,
  useCommandPost,
} from '../context/ApiContext/queries/command';
import UIButton from '../UIButton';

interface UploadCommandDialogProps {
  onDialogClose: () => void;
  showDialog: boolean;
}

function UploadCommandDialog({
  onDialogClose,
  showDialog,
}: UploadCommandDialogProps): JSX.Element {
  // TODO: Show errors to the user.
  const post = useCommandPost({
    onSuccess: () => {
      // On success event, we want to close the dialog.
      onDialogClose();
    },
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const analysisQueryRef = useRef<HTMLTextAreaElement>(null);
  const transformationQueryRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (nameRef.current && analysisQueryRef.current) {
      const payload: CommandPostPayload = {
        command_type: 2,
        command_name: nameRef.current.value,
        sanitized_command_input: {
          epsilon: 1,
          analysis_query: analysisQueryRef.current.value,
        },
      };
      // Add transformation query value if provided.
      const transformationVal = transformationQueryRef.current?.value;
      if (transformationVal && transformationVal.length > 0) {
        payload.sanitized_command_input.transformation_query =
          transformationVal;
      }

      post.mutate(payload);
    }
  };

  const handleDialogClose = () => {
    // Upon closing the dialog outside the onSuccess event,
    // reset the command post mutation to avoid lingering errors.
    onDialogClose();
    post.reset();
  };

  return (
    <Dialog
      open={showDialog}
      onClose={handleDialogClose}
      aria-labelledby="upload-command-dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="upload-command-dialog-title">
          Upload command
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus={true}
            margin="dense"
            id="name"
            label="Command name"
            type="text"
            fullWidth={true}
            inputRef={nameRef}
            required={true}
            // error={post.isError}
            // helperText={
            //   post.isError && 'Command name should be unique in your set.'
            // }
          />
          <TextField
            multiline={true}
            margin="dense"
            id="analysis-query"
            label="Analysis query"
            rowsMax={10}
            inputRef={analysisQueryRef}
            fullWidth={true}
            required={true}
            inputProps={{ style: { fontFamily: 'monospace' } }}
          />
          <TextField
            multiline={true}
            margin="dense"
            id="transformation-query"
            label="Transformation query"
            rowsMax={10}
            inputRef={transformationQueryRef}
            fullWidth={true}
            inputProps={{ style: { fontFamily: 'monospace' } }}
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

export default UploadCommandDialog;
