import Link from 'next/link';
import { useState } from 'react';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import UIButton from '../UIButton';
import UploadCommandDialog from './UploadCommandDialog';

function UploadSection(): JSX.Element {
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    setShowDialog(true);
  };
  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <SectionTitle>Upload Command File</SectionTitle>
      <Paragraph>
        To start, upload one or more <Link href="/help">command files</Link>{' '}
        below. Remember that the system supports only a{' '}
        <Link href="/help">limited number of commands</Link> at this time. After
        you select <strong>Open</strong>, the system will begin processing the
        commands, which may take a few minutes. Results for each command will
        appear below as the system completes the processing.
      </Paragraph>
      <UIButton title="Upload a command" icon="Publish" onClick={handleClick} />
      <UploadCommandDialog
        onDialogClose={handleDialogClose}
        showDialog={showDialog}
      />
    </div>
  );
}

export default UploadSection;
