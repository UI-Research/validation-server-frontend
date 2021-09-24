import { Button, ButtonProps, makeStyles } from '@material-ui/core';
import {
  Publish,
  PlaylistAdd,
  MoreVert,
  AddShoppingCart,
  Add,
  ChevronRight,
} from '@material-ui/icons';
import notEmpty from '../util/notEmpty';

const useStyles = makeStyles(() => ({
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
      background: '#0a4c6a',
    },
  },
}));

type Icon =
  | 'Publish'
  | 'PlaylistAdd'
  | 'MoreVert'
  | 'AddShoppingCart'
  | 'Add'
  | 'ChevronRight';

interface UIButtonProps
  extends Omit<ButtonProps, 'children' | 'endIcon' | 'variant'> {
  title: string;
  icon?: Icon;
}

function UIButton({
  title,
  icon,
  className,
  ...props
}: UIButtonProps): JSX.Element {
  const classes = useStyles();

  return (
    <Button
      {...props}
      variant="contained"
      className={[classes.button, className].filter(notEmpty).join(' ')}
      endIcon={icon && getIcon(icon)}
    >
      {title}
    </Button>
  );
}

function getIcon(icon: Icon) {
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

export default UIButton;
