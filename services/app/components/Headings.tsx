import { Typography, TypographyProps } from '@material-ui/core';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingProps = Omit<TypographyProps<HeadingType>, 'variant'>;
const H1: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Typography variant="h1" {...props}>
      {children}
    </Typography>
  );
};
const H2: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Typography variant="h2" {...props}>
      {children}
    </Typography>
  );
};
const H3: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Typography variant="h3" {...props}>
      {children}
    </Typography>
  );
};
const H4: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Typography variant="h4" {...props}>
      {children}
    </Typography>
  );
};
const H5: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Typography variant="h5" {...props}>
      {children}
    </Typography>
  );
};

const H6: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Typography variant="h6" {...props}>
      {children}
    </Typography>
  );
};

export { H1, H2, H3, H4, H5, H6 };
