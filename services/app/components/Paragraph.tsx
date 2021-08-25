import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paragraph: {
    margin: theme.spacing(2, 0),
  },
}));

const Paragraph: React.FC = ({ children }) => {
  const classes = useStyles();
  return <Typography className={classes.paragraph}>{children}</Typography>;
};

export default Paragraph;
