import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  sectionTitle: {
    margin: theme.spacing(2, 0),
    fontSize: '20px',
    fontWeight: 'bold',
  },
}));

interface SectionTitleProps {
  //
}
const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.sectionTitle} variant="h4">
      {children}
    </Typography>
  );
};

export default SectionTitle;
