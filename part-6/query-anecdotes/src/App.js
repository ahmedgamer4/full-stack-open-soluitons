import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecs, updateAnec } from './requets'

const App = () => {
  const queryClient = useQueryClient()

  const updatedAnecMutation = useMutation(updateAnec, {
    onSuccess: (updatedAnec) => {
      const anecs = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecs.map((a) => a.id === updatedAnec.id ? updatedAnec : a))
    }
  })

  const handleVote = (anecdote) => {
    updatedAnecMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery('anecdotes', getAnecs)


  if (result.isLoading) {
    return (
      <div>Fetching data....</div>
    )
  }
  
  const anecdotes = result.data

  console.log(anecdotes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
