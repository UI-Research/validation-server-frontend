import CodeBlock from '../../CodeBlock';
import { CommandResponseResult } from '../../context/ApiContext/queries/command';
import AccordionContentTitle from './AccordionContentTitle';

interface CommandDisplayProps {
  command: CommandResponseResult;
}

function CommandDisplay({ command }: CommandDisplayProps): JSX.Element {
  return (
    <div>
      <AccordionContentTitle>Command:</AccordionContentTitle>
      <div>
        <CodeBlock code={command.sanitized_command_input.analysis_query} />
      </div>
    </div>
  );
}

export default CommandDisplay;
