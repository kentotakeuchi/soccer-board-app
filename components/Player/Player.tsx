import { gql } from '@apollo/client'
import React, { ChangeEvent, SyntheticEvent } from 'react'
import Image from 'next/image'
import { usePlayerQuery, useUpdatePlayerMutation } from '../../lib/graphql/types'
import avatarPic from '../../public/images/avatar.jpg'
import styled from 'styled-components'

interface Props {
  playerId: string
}

gql`
  query Player($playerId: ID!) {
    player(playerId: $playerId) {
      name
      photo
    }
  }

  mutation updatePlayer($playerId: ID!, $data: PlayerInput!) {
    updatePlayer(playerId: $playerId, data: $data) {
      name
      photo
    }
  }
`

const Player = ({ playerId }: Props) => {
  const { data, loading } = usePlayerQuery({
    variables: {
      playerId
    }
  })

  console.log({ data })

  const [localName, setLocalName] = React.useState('')
  const [updatePlayerMutation, { data: updatedPlayerData, loading: updating }] =
    useUpdatePlayerMutation()

  React.useEffect(() => {
    setLocalName(data?.player?.name || 'player')
  }, [data?.player?.name])

  const onChangeLocalName = (e: ChangeEvent) => {
    const name = (e.target as HTMLInputElement).value
    setLocalName(name)
  }

  const onSubmitUpdatedName = (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      name: { value: string }
      photo?: { value: string }
    }

    const name = target.name.value
    const photo = target.photo?.value

    updatePlayerMutation({
      variables: {
        playerId,
        data: {
          name,
          photo
        }
      }
    })
  }

  if (loading) return <p>Loading..</p>

  return (
    <>
      <form onSubmit={onSubmitUpdatedName}>
        <label>
          <input type='file' style={{ display: 'none' }} />
          <PlayerWrapper>
            <Image
              src={data?.player?.photo || avatarPic}
              alt='avatar'
              width={'48px'}
              height={'48px'}
            />
            <figcaption>
              <input type='text' value={localName} onChange={onChangeLocalName}></input>
            </figcaption>
          </PlayerWrapper>
        </label>
      </form>
    </>
  )
}

const PlayerWrapper = styled.figure`
  & > div {
    border-radius: 50%;
  }
`

export default Player
