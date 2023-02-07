import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import NotificationContext from "../NotificationContext"
import { createAnec } from "../requets"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const newAnecMutation = useMutation(createAnec, {
    onSuccess: (newAnec) => {
      const anecs = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecs.concat(newAnec))
    },
    onError: () => {
      dispatch({ type: 'setNotification', msg: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        dispatch({ type: 'setNotification', msg: '' })
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecMutation.mutate({ content, votes: 0 })
    dispatch({ type: 'setNotification', msg: `You created ${content}` })
    setTimeout(() => {
      dispatch({ type: 'setNotification', msg: `` })
    }, 5000);

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
