import { makeStyles } from '@material-ui/core';

interface CodeBlockProps {
  maxHeight?: number;
  code: string;
}

const useClasses = makeStyles(theme => ({
  pre: {
    backgroundColor: theme.palette.action.hover,
    overflow: 'auto',
    padding: theme.spacing(2),
  },
}));

function CodeBlock({ maxHeight, code }: CodeBlockProps): JSX.Element {
  const classes = useClasses();
  return (
    <pre className={classes.pre} style={{ maxHeight }}>
      {code}
    </pre>
  );
}

export default CodeBlock;
