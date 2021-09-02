import { gql } from '@apollo/client'
import React, { ChangeEvent, SyntheticEvent } from 'react'
import Image from 'next/image'
import { usePlayerQuery, useUpdatePlayerMutation } from '../../lib/graphql/types'
// import avatarPic from '../../public/images/avatar.jpg'
import styled from 'styled-components'
import { motion } from 'framer-motion'

interface Props {
  playerId: string
  constraintsRef: React.MutableRefObject<null>
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

const Player = ({ playerId, constraintsRef }: Props) => {
  const { data, loading } = usePlayerQuery({
    variables: {
      playerId
    }
  })

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
      dragConstraints={constraintsRef}
      dragElastic={0.5}
      dragMomentum={false} // stop inertia if false
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      whileDrag={{ scale: 0.9 }}
      whileTap={{ cursor: 'grabbing', scale: 0.9 }}
    >
      <form onSubmit={onSubmitUpdatedName}>
        <label>
          {/* <input type='file' style={{ display: 'none' }} /> */}
          <PlayerWrapper>
            {/* <Image
              // src={data?.player?.photo || avatarPic}
              src={avatarPic}
              alt='avatar'
              width={'48px'}
              height={'48px'}
            /> */}
            <PlayerIcon />
            <figcaption>
              <NameInput
                type='text'
                value={localName}
                onChange={onChangeLocalName}
                size={localName.length}
              />
            </figcaption>
          </PlayerWrapper>
        </label>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  cursor: grab;
  width: max-content;
`

const PlayerWrapper = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: max-content;

  /* & > div {
    width: 48px;
    border-radius: 50%;
  } */
`

const PlayerIcon = styled(motion.div)`
  width: 36px;
  height: 36px;
  background: red;
  border-radius: 50%;
  border: 1px solid var(--color-transparent-black-15);
`

const NameInput = styled.input`
  --space: 12px;
  /* width: calc(${props => props.size}ch + calc(var(--space) * 2)); */
  padding: 4px var(--space);
  border: 0;
  border-radius: 16px;
  background: var(--color-transparent-black-15);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  text-align: center;
  letter-spacing: 1px;
`

export default Player
