import { gql } from '@apollo/client'
import Head from 'next/head'
import React, { ChangeEvent } from 'react'
import Field from '../components/Field'
import Todo from '../components/Todo'
import { useIndexCreateTodoMutation, useIndexQuery } from '../lib/graphql/types'

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
  const { data, loading } = useIndexQuery()
  const [newTodoDescription, setNewTodoDescription] = React.useState('')
  const [todoIds, setTodoIds] = React.useState<string[]>([])
  const [createTodo] = useIndexCreateTodoMutation()

  const fillTodoIds = (data: string[]) => {
    setTodoIds(data?.slice().sort((a, b) => a.localeCompare(b)))
  }

  React.useEffect(() => {
    fillTodoIds(data?.allTodos?.map(t => t.todoId))
  }, [data?.allTodos])

  const updateTodoDescription = (e: ChangeEvent) => {
    setNewTodoDescription((e.target as HTMLInputElement).value.toString())
  }

  const onClickAddTodo = async () => {
    const result = await createTodo({
      variables: {
        description: newTodoDescription
      }
    })

    fillTodoIds(todoIds.concat(result.data?.createTodo?.todoId))
  }

  const todoElements = todoIds?.map(id => <Todo todoId={id} key={id} />)

  const body =
    loading || typeof todoElements === 'undefined' ? null : todoElements.length > 0 ? (
      <>
        <table>
          <tbody>{todoElements}</tbody>
        </table>
      </>
    ) : (
      <div>No ToDos!</div>
    )

  return (
    <>
      <input
        type='text'
        placeholder='What needs to be done?'
        value={newTodoDescription}
        onChange={updateTodoDescription}
      ></input>
      <button type='button' onClick={onClickAddTodo}>
        Add
      </button>
      {body}
    </>
  )

  // return (
  //   <>
  //     <Head>
  //       <title>Home | Soccer Board App</title>
  //       <meta name='description' content='Digital soccer board application.' />
  //       <link rel='icon' href='/favicon.ico' />
  //     </Head>

  //     <Field />
  //     <p>home</p>
  //   </>
  // )
}
