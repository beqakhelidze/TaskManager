import { useMantineColorScheme, SegmentedControl, Group, Center, } from '@mantine/core';
import { Sun, Moon } from 'tabler-icons-react';

const LightAndDarkModeButton = () => {

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
      <SegmentedControl
        value={colorScheme}
        onChange={() => toggleColorScheme()}
        style={{
          position:"absolute",
          right:"50px",
          top:"15px",
        }}
        data={[
          {
            value: 'light',
            label: (
              <Center>
                <Sun size={16} color="orange" />
              </Center>
            ),
          },
          {
            value: 'dark',
            label: (
              <Center>
                <Moon size={16} color="orange" />

              </Center>
            ),
          },
        ]}
      />
  );
}

export default LightAndDarkModeButton;