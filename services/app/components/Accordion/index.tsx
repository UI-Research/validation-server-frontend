import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { ReactNode } from 'react';

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
    // Undo default expanded styling.
    '&.Mui-expanded': {
      minHeight: 'inherit',
    },
  },
  summaryContent: {
    margin: 0,
    borderRightColor: theme.palette.grey[600],
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    minHeight: '48px',
    // Undo default expanded styling.
    '&.Mui-expanded': {
      margin: 0,
    },
  },
  summaryExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
        classes={{
          content: classes.summaryContent,
          expanded: classes.summaryExpanded,
        }}
        className={classes.summary}
        expandIcon={<ExpandMore />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
      >
        {/*
          If the summary content is a string,
          then place it in a center align Grid so that is is vertically centered.
        */}
        {typeof summaryContent === 'string' ? (
          <Grid container={true} alignItems="center">
            {summaryContent}
          </Grid>
        ) : (
          summaryContent
        )}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
