import Container from '@material-ui/core/Container';
import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface PageTemplateProps {
  description?: string;
  title: string;
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  children,
  title,
  description = title,
}) => (
  <React.Fragment>
    <Head>
      <title>{title} | UI-Research/validation-server-frontend</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>
    <Header />
    {/* Need to do a check or else Component will complain. */}
    {children && <Container component="main">{children}</Container>}
    <Footer />
  </React.Fragment>
);

export default PageTemplate;
