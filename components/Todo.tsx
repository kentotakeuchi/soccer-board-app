import { gql } from '@apollo/client'
import React, { ChangeEvent } from 'react'
import { useTodoQuery, useUpdateTodoMutation } from '../lib/graphql/types'

interface Props {
  todoId: string
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

const Todo = (props: Props) => {
  const { todoId } = props
  const { loading, data } = useTodoQuery({
    variables: {
      todoId
    }
  })
  const [localCompleted, setLocalCompleted] = React.useState(false)
  const [updateTodo] = useUpdateTodoMutation()
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
