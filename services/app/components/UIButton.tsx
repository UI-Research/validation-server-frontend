import { Button } from '@material-ui/core';
import {
  Publish,
  PlaylistAdd,
  MoreVert,
  AddShoppingCart,
  Add,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import clsx, { ClassDictionary } from 'clsx';

const styles = {
  button: {
    background: '#1696d2',
    border: 0,
    borderRadius: 0,
    color: 'white',
    padding: '15px 10px',
    fontSize: '14px',
    lineHeight: '1rem',
    boxShadow: 'none',
    '&:hover': {
      background: '#0a4c6a'
    },
  },
};

interface UIButtonProps {
  title: string;
  icon?: string;
  classes: ClassDictionary;
}

function UIButton(props: UIButtonProps): JSX.Element {
  const { classes, title, icon } = props;

  return (
    <Button
      variant="contained"
      className={clsx(classes.button)}
      endIcon={icon && getIcon(icon)}
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
    case 'MoreVert':
      return <MoreVert />;
    case 'AddShoppingCart':
      return <AddShoppingCart />;
    case 'Add':
      return <Add />;
    default:
      return null;
  }
}

export default withStyles(styles)(UIButton);
