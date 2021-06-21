import styled from '@emotion/styled';
import Head from 'next/head';

// Just an example of emotion working.
const H1 = styled('h1')`
  color: ${props => props.theme.palette.blue.base};
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>UI-Research/validation-server-frontend</title>
        <meta
          name="description"
          content="UI-Research/validation-server-frontend"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <H1>UI-Research/validation-server-frontend</H1>

        <div>
          Gravida voluptates eleifend adipisci? Diamlorem rutrum penatibus
          earum, quasi feugiat quo ligula! Primis. Dolores etiam diamlorem fusce
          cum reprehenderit orci. Bibendum habitant, praesentium habitasse
          senectus possimus. Nostrum? Fringilla. Maxime pretium, lacinia velit.
          Atque arcu sapiente corrupti? Beatae mattis rerum eum.
        </div>
      </main>

      <footer>
        <div>
          Omnis impedit dapibus rem amet tempus, massa habitasse nonummy aut.
        </div>
      </footer>
    </div>
  );
}
