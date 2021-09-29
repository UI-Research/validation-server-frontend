import PageTemplate from '../components/PageTemplate';
import SectionTitle from '../components/SectionTitle';
import StyleGuide from '../components/StyleGuide/StyleGuide';
import Paragraph from '../components/Paragraph';

const title = 'Data';

function DataPage(): JSX.Element {
  return (
    <PageTemplate title={title}>
      <SectionTitle>{title}</SectionTitle>
      <div>
        <Paragraph>
          Paragraph 1
        </Paragraph>
        <Paragraph>
          Paragraph 2
        </Paragraph>
      </div>
    </PageTemplate>
  );
}

export default DataPage;
