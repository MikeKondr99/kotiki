import { Center, useMantineTheme } from '@mantine/core'
import { Text } from '@mantine/core';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Cats from './Components/Cats';


export default function App() {

  const theme  = useMantineTheme()
  const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Text fz='3em' bg={theme.colors.blue[6]} color={theme.white}>Котики</Text>
      <Center style={{maxWidth:'100%'}}>
        <Cats></Cats>
      </Center>
    </QueryClientProvider>
    </>
  )
}

