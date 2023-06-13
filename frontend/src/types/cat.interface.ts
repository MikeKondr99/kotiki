
export interface Cat {
  id: number,
  name: string,
  age: number,
  color: string,
  sex: string,
  image: string | undefined,
  breed: string | undefined,
  sterilized: boolean,
  description: string | undefined
}

export interface UpdateCat {
  name: string,
  age: number,
  color: string,
  sex: string,
  image: string | undefined,
  breed: string | undefined,
  sterilized: boolean,
  description: string | undefined
}