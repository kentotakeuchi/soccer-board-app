import { gql } from '@apollo/client'
import Head from 'next/head'
import React, { ChangeEvent } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Field from '../components/Field'
import { useAllPlayersQuery, useCreatePlayerMutation } from '../lib/graphql/types'
import Player from '../components/Player'

gql`
  query allPlayers {
    allPlayers {
      playerId
    }
  }

  mutation createPlayer($data: PlayerInput!) {
    createPlayer(data: $data) {
      playerId
    }
  }
`

export default function HomePage() {
  // set draggable area
  const constraintsRef = React.useRef(null)

  const { data: session, status } = useSession({ required: false })
  console.log({ session, status })

  const { data: allPlayersData, loading: querying, error } = useAllPlayersQuery()
  // console.log({ data: allPlayersData, querying, error })

  const [newPlayerName, setNewPlayerName] = React.useState('')
  const [newPlayerPhoto, setNewPlayerPhoto] = React.useState('')
  const [playerIds, setPlayerIds] = React.useState<string[]>([])
  const [createPlayerMutation, { data: createdPlayerData, loading: creating }] =
    useCreatePlayerMutation()
  // console.log({ playerIds, createdPlayerData, creating })

  React.useEffect(() => {
    fillPlayerIds(allPlayersData?.allPlayers?.map(t => t.playerId) || [])
  }, [allPlayersData?.allPlayers])

  const fillPlayerIds = (data: string[]): void => {
    setPlayerIds(data?.slice().sort((a, b) => a.localeCompare(b)))
  }

  // trigger by onChange
  const updatePlayerName = (e: ChangeEvent) => {
    setNewPlayerName((e.target as HTMLInputElement).value.toString())
  }
  const updatePlayerPhoto = (e: ChangeEvent) => {
    setNewPlayerPhoto((e.target as HTMLInputElement).value.toString())
  }

  // trigger by clicking add button
  const onClickAddPlayer = async () => {
    // console.log({ newPlayerName, newPlayerPhoto })
    const result = await createPlayerMutation({
      variables: {
        data: { name: newPlayerName, photo: newPlayerPhoto }
      }
    })

    fillPlayerIds(playerIds.concat(result.data?.createPlayer?.playerId || ''))
  }

  if (status === 'loading') return <p>Loading session..</p>
  // if (status === 'authenticated') return <p>authenticated..</p>
  if (querying) return <p>Quering..</p>
  if (creating) return <p>Creating..</p>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  const playerElements = playerIds.map(id => (
    <Player playerId={id} key={id} constraintsRef={constraintsRef} />
  ))

  return (
    <>
      <Head>
        <title>Home | Soccer Board App</title>
        <meta name='description' content='Digital soccer board application.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Field constraintsRef={constraintsRef} />

      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}

      <form onSubmit={onClickAddPlayer}>
        <input type='text' placeholder='Name' value={newPlayerName} onChange={updatePlayerName} />
        <input
          type='file'
          placeholder='Your photo'
          value={newPlayerPhoto}
          onChange={updatePlayerPhoto}
        />
        <button>Add</button>
      </form>

      {playerElements.length > 0 ? playerElements : <p>add your fighter</p>}
    </>
  )
}
