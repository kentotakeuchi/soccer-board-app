import Head from 'next/head'
import Field from '../components/Field'
import { useQuery, gql } from '@apollo/client'

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`

function Dogs({ onDogSelected }: any) {
  const { loading, error, data } = useQuery(GET_DOGS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <select name='dog' onChange={onDogSelected}>
      {data.dogs.map((dog: any) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  )
}

function DogPhoto({ breed }: any) {
  const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
    variables: { breed }
  })

  if (loading) return null
  if (error) return `Error! ${error}`

  return <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home | Soccer Board App</title>
        <meta name='description' content='Digital soccer board application.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Field />
      <p>home</p>
      <Dogs />
    </>
  )
}
