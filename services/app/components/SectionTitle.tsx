import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  sectionTitle: {
    margin: theme.spacing(2, 0),
  },
}));

const SectionTitle: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.sectionTitle} variant="h4">
      {children}
    </Typography>
  );
};

export default SectionTitle;
