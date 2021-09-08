import Paragraph from '../../Paragraph';

const AccordionContentTitle: React.FC = ({ children }) => (
  <Paragraph>
    <strong>{children}</strong>
  </Paragraph>
);

export default AccordionContentTitle;
