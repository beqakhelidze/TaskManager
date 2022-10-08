import { useState } from 'react'
import Taskify from './Components/Taskify';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import {
  Container,
  MantineProvider,
  MantineThemeOverride,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";

const myTheme = (color:"dark" | "light") => {
  return ({
    colorScheme: color,
    primaryColor: 'orange',
    defaultRadius: 0,
  })
};

function App() {

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={myTheme(colorScheme)} withGlobalStyles withNormalizeCSS>
        <Container className="App" style={{ textAlign: "center", }}>
          <Taskify />
        </Container>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
