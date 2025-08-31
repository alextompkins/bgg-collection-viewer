import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { render } from 'preact';

import { ViewCollection } from './pages/ViewCollection/ViewCollection.tsx';
import { theme } from './theme.ts';

render(
  <MantineProvider theme={theme}>
    <ViewCollection />
  </MantineProvider>,
  document.getElementById('root')!,
);
