import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { ReactNode, useState } from 'react';

const useStyles = makeStyles(theme => ({
  wrapper: {
    borderColor: theme.palette.grey[600],
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '1px',
    margin: theme.spacing(2, 0),
  },
  summary: {
    backgroundColor: theme.palette.grey[300],
    borderBottomColor: theme.palette.grey[600],
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderRadius: '4px',
    marginBottom: '-1px',
  },
  summaryExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  checkIcon: {
    color: theme.palette.success.dark,
  },
}));

interface AccordionProps {
  id: string;
  summaryContent: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  id,
  summaryContent,
}) => {
  const classes = useStyles();
  return (
    <MuiAccordion className={classes.wrapper} elevation={0}>
      <AccordionSummary
        classes={{ expanded: classes.summaryExpanded }}
        className={classes.summary}
        expandIcon={<ExpandMore />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
      >
        <Grid container={true}>{summaryContent}</Grid>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
