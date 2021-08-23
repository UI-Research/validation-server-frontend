import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import UIButton from '../UIButton';
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
      <UIButton title="Upload a file" icon="Publish" />
    </div>
  );
}

export default UploadSection;
