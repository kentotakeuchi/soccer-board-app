import { gql } from '@apollo/client'
import React, { ChangeEvent, SyntheticEvent } from 'react'
import Image from 'next/image'
import { usePlayerQuery, useUpdatePlayerMutation } from '../../lib/graphql/types'
import avatarPic from '../../public/images/avatar.jpg'
import styled from 'styled-components'
import { motion } from 'framer-motion'

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
    <Wrapper
      drag
      layout
      whileDrag={{
        scale: 0.95
      }}
      // dragConstraints={{ top: 0, right: 0, bottom: -125, left: 0 }}
      dragElastic={0.5}
      dragMomentum={true}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      whileTap={{ cursor: 'grabbing' }}
      style={{ cursor: 'grab' }}
    >
      <form onSubmit={onSubmitUpdatedName}>
        <label>
          {/* <input type='file' style={{ display: 'none' }} /> */}
          <PlayerWrapper>
            <Image
              // src={data?.player?.photo || avatarPic}
              src={avatarPic}
              alt='avatar'
              width={'48px'}
              height={'48px'}
            />
            <figcaption>
              <NameInput
                type='text'
                value={localName}
                onChange={onChangeLocalName}
                size={localName.length}
              ></NameInput>
            </figcaption>
          </PlayerWrapper>
        </label>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  /* cursor: grab; */
`

const PlayerWrapper = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;

  & > div {
    width: 48px;
    border-radius: 50%;
  }
`

const NameInput = styled.input`
  --space: 4px;
  width: calc(${props => props.size}ch + var(--space));
  padding: 4px var(--space);
  border: 0;
  border-radius: 8px;
  background: var(--color-transparent-black-90);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  text-align: center;
`

export default Player
