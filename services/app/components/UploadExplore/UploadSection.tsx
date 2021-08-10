import { Button } from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { sanitizedCommandInput } from '../../util/example-data/sql-commands';
import ApiContext from '../context/ApiContext';
import post from '../context/ApiContext/post';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';

interface CommandPayload {
  command_type: number;
  command_name: string;
  sanitized_command_input: {
    epsilon: number;
    analysis_query: string;
    transformation_query: string;
  };
}

const testPayload: CommandPayload = {
  command_type: 2,
  command_name: 'test-command-1.sql',
  sanitized_command_input: sanitizedCommandInput,
};

interface UploadSectionProps {
  // TODO
}
function UploadSection({}: UploadSectionProps): JSX.Element {
  const { token } = useContext(ApiContext);
  const postCommand = async (data: CommandPayload) => {
    const response = await post('/command/', token, data);
    return response;
  };
  const result = useMutation(postCommand, {
    onSuccess: data => {
      console.log('onSuccess');
      console.log(data);
    },
    onError: error => {
      console.log('onError');
      console.error(error);
    },
    onSettled: () => {
      console.log('onSettled');
      // Invalidate some query.
      // queryClient.invalidateQueries('create');
    },
  });
  console.log(result);

  const handleClick = () => {
    console.log('handleClick');
    const payload = testPayload;
    result.mutate(payload);
  };

  return (
    <div>
      <SectionTitle>Upload Command File</SectionTitle>
      <Paragraph>
        To start, upload one or more <a href="#">command files</a> below.
        Remember that the system supports only a{' '}
        <a href="#">limited number of commands</a> at this time. After you
        select <strong>Open</strong>, the system will begin processing the
        commands, which may take a few minutes. Results for each command will
        appear below as the system completes the processing.
      </Paragraph>
      <Button
        variant="contained"
        color="primary"
        endIcon={<Publish />}
        onClick={handleClick}
      >
        Upload a file
      </Button>
    </div>
  );
}

export default UploadSection;
