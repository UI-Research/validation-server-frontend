import { makeStyles } from '@material-ui/core';
import { H4 } from './Headings';

const useStyles = makeStyles(theme => ({
  sectionTitle: {
    margin: theme.spacing(2, 0),
    fontSize: '20px',
    fontWeight: 'bold',
  },
}));

const SectionTitle: React.FC = ({ children }) => {
  const classes = useStyles();
  return <H4 className={classes.sectionTitle}>{children}</H4>;
};

export default SectionTitle;
