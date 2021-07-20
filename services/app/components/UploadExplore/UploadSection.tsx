import { Button } from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';

interface UploadSectionProps {
  // TODO
}
function UploadSection({}: UploadSectionProps): JSX.Element {
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
      <Button variant="contained" color="primary" endIcon={<Publish />}>
        Upload a file
      </Button>
    </div>
  );
}

export default UploadSection;
