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
}

export default function App() {
  const [cats,setCats] = useState<Cat[]>([])
  useEffect(() => {
     fetch("https://127.0.0.1:8000/api/cats")
      .then(response =>  response.json())
      .then(data => setCats(data as Cat[]));
  })
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
                ></BadgeCard>
            </Grid.Col>
          )}
        </Grid>
    </>

  )
}

