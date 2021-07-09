import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(10, 15),
  },
  topContent: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(-3),
  },
}));

interface PageTemplateProps {
  description?: string;
  title: string;
  /** Will display above the content component in its own box (`<Paper>`) */
  topContent?: ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  children,
  title,
  topContent,
  description = title,
}) => {
  const classes = useStyles();
  return (
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
      <main>
        <Container>
          {topContent && (
            <Paper className={classes.topContent}>{topContent}</Paper>
          )}
          {/* Need to do a check or else Component will complain. */}
          {children ? (
            <Paper className={classes.content}>{children}</Paper>
          ) : (
            false
          )}
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default PageTemplate;
