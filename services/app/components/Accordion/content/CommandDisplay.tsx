import { Typography } from '@material-ui/core';
import CodeBlock from '../../CodeBlock';
import { CommandResponseResult } from '../../context/ApiContext/queries/command';
import AccordionContentTitle from './AccordionContentTitle';

interface CommandDisplayProps {
  command: CommandResponseResult;
}

function CommandDisplay({
  command: {
    sanitized_command_input: { analysis_query, transformation_query },
  },
}: CommandDisplayProps): JSX.Element {
  return (
    <div>
      <AccordionContentTitle>Command:</AccordionContentTitle>
      {transformation_query ? (
        <div>
          <Typography>Analysis Query</Typography>
          <CodeBlock code={analysis_query} />
          <Typography>Transormation Query</Typography>
          <CodeBlock code={transformation_query} />
        </div>
      ) : (
        <div>
          <CodeBlock code={analysis_query} />
        </div>
      )}
    </div>
  );
}

export default CommandDisplay;
