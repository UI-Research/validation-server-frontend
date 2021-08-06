import { Button, ButtonProps } from '@material-ui/core';
import {
  Publish,
  PlaylistAdd,
  MoreVert,
  AddShoppingCart,
  Add,
  ChevronRight,
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

interface UIButtonProps extends ButtonProps {
  title: string;
  icon?:
    | 'Publish'
    | 'PlaylistAdd'
    | 'MoreVert'
    | 'Add'
    | 'AddShoppingCart'
    | 'ChevronRight';
  classes: ClassDictionary;
}

function UIButton(props: UIButtonProps): JSX.Element {
  const { classes, title, icon, disabled } = props;

  return (
    <Button
      variant="contained"
      className={clsx(classes.button)}
      endIcon={icon && getIcon(icon)}
      disabled={disabled}
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
    case 'ChevronRight':
      return <ChevronRight />;
    default:
      return null;
  }
}

export default withStyles(styles)(UIButton);
