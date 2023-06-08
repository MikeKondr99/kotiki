import { Grid } from '@mantine/core'
import './App.css'
import { BadgeCard } from './Components/BadgeCard'
import { useEffect, useState } from 'react'

interface Cat {
    name: string,
    age: number,
    color: string,
    sex: string,
    image: string | undefined,
    breed: string | undefined,
    sterilized: boolean,
    description: string | undefined
}

export default function App() {
  const [cats,setCats] = useState<Cat[]>([])
  useEffect(() => {
     fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/cats`)
      .then(response =>  response.json())
      .then(data => setCats(data as Cat[]));
  },[])
  return (
    <>      
        <Grid m='xl'>{
          cats.map(c =>
            <Grid.Col xs={3}>
              <BadgeCard 
                image={c.image} 
                name={c.name} 
                breed={c.breed}
                age= {c.age}
                color={c.color}
                sex = {c.sex}
                sterilized = {c.sterilized}
                description={c.description}
                ></BadgeCard>
            </Grid.Col>
          )}
        </Grid>
    </>

  )
}

