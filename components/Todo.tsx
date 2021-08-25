import { gql } from '@apollo/client'
import React, { ChangeEvent } from 'react'
import { usePlayerQuery, useUpdatePlayerMutation } from '../lib/graphql/types'

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
  const [localCompleted, setLocalCompleted] = React.useState(false)
  const [updatePlayerMutation, { data: updatedPlayerData, loading: updating }] =
    useUpdatePlayerMutation()
  let content = <td colSpan={2}>Loading ...</td>

  React.useEffect(() => {
    setLocalCompleted(data?.Todo?.completed || false)
  }, [data?.Todo?.completed])

  const onToggleCompleted = (e: ChangeEvent) => {
    const completed = (e.target as HTMLInputElement).checked
    setLocalCompleted(completed)
    updateTodo({
      variables: {
        todoId,
        data: {
          completed
        }
      }
    })
  }

  if (!loading && data) {
    const { description } = data.Todo

    content = (
      <>
        <td>
          <input type='checkbox' checked={localCompleted} onChange={onToggleCompleted}></input>
        </td>
        <td>{description}</td>
      </>
    )
  }

  return <tr>{content}</tr>
}

export default Todo
