import { Center } from '@mantine/core'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Cats from './Components/Cats';





export default function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Center style={{maxWidth:'100%'}}>
        <Cats></Cats>
      </Center>
    </QueryClientProvider>
  )
}

