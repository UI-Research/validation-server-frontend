import PageTemplate from '../components/PageTemplate';
import SectionTitle from '../components/SectionTitle';
import StyleGuide from '../components/StyleGuide/StyleGuide';

const title = 'Data';

function DataPage(): JSX.Element {
  return (
    <PageTemplate title={title}>
      <SectionTitle>{title}</SectionTitle>
      <StyleGuide />
    </PageTemplate>
  );
}

export default DataPage;
