import { Center, Flex, useMantineTheme } from '@mantine/core'
import { Text } from '@mantine/core';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Cats from './Components/Cats';
import { IconCat } from '@tabler/icons-react';


export default function App() {

  const theme  = useMantineTheme()
  const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Flex bg={theme.colors.blue[6]} align='center' gap={15} px={20}>
        <IconCat color='white' size={50}/>
        <Text fz='3em' color='white'>Котики</Text>
      </Flex>
      <Center style={{maxWidth:'100%'}}>
        <Cats/>
      </Center>
    </QueryClientProvider>
    </>
  )
}

