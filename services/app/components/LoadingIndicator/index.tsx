import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';

/** Display a centered loading/progress indicator. */
function LoadingIndicator(): JSX.Element {
  return (
    <Grid container={true} justifyContent="center">
      <Grid item={true}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

export default LoadingIndicator;
