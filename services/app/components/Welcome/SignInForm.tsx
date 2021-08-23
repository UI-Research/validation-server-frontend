import { Box, TextField } from '@material-ui/core';
import { FormEventHandler, useContext, useRef, useState } from 'react';
import ApiContext from '../context/ApiContext';
import { useApiTokenMutation } from '../context/ApiContext/token';
import UIButton from '../UIButton';

function SignInForm(): JSX.Element {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState(false);
  const apiTokenMutation = useApiTokenMutation();
  const { setToken } = useContext(ApiContext);

  const handleSignInSubmit: FormEventHandler<HTMLFormElement> = event => {
    setShowError(false);
    event.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      apiTokenMutation.mutate(
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        },
        {
          onSuccess: data => {
            // Scroll to the top of the page.
            window.scrollTo(0, 0);
            // Set token using the response data.
            setToken(data.token);
          },
          onError: () => {
            setShowError(true);
          },
        },
      );
    }
  };
  return (
    <form onSubmit={handleSignInSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required={true}
        fullWidth={true}
        type="text"
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        inputRef={usernameRef}
        error={showError}
        helperText={
          showError && 'Unable to sign in with provided credentials. Try again.'
        }
      />
      <TextField
        variant="outlined"
        margin="normal"
        required={true}
        fullWidth={true}
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        inputRef={passwordRef}
        error={showError}
      />
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <UIButton title="Submit" type="submit" />
      </Box>
    </form>
  );
}

export default SignInForm;
