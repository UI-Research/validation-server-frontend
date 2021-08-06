import { Button } from '@material-ui/core';
import { Publish, PlaylistAdd } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const styles = {
  button: {
    background: '#1696d2',
    border: 0,
    borderRadius: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: 'none',
    '&:hover': {
      background: '#0a4c6a'
    },
  },
};

function UIButton(props: any): JSX.Element {
  const { classes, title, icon } = props;

  return (
    <Button
      variant="contained"
      className={clsx(classes.button)}
      endIcon={getIcon(icon)}
    >
      {title}
    </Button>
  );
}

function getIcon(icon: string) {
  switch (icon) {
    case 'Publish':
      return <Publish />;
    case 'PlaylistAdd':
      return <PlaylistAdd />;
    default:
      return null;
  }
}

export default withStyles(styles)(UIButton);
