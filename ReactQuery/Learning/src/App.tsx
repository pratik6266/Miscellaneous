import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import './index.css'
import Page from './Page'

export interface Post {
  id: number
  title: string
}

const Posts: Post[] = [
  { id: 1, title: 'Post 1'},
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' }
]

const App: React.FC = () => {

  const [currentPage, setCurrentPage] = React.useState<React.ReactElement | null>(null);
  const queryClient = useQueryClient()

  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1000).then(() => [...Posts]),
    // refetchInterval: 2000 //! Refetch data every 2 seconds
    // enabled: currentPage === null //! can add condition when to fetch data
    
  })

  const newPost = useMutation({
    mutationFn: () => wait(1000).then(() => { 
      const id = Posts.length + 1
      const title = `Post ${id}`
      Posts.push({ id, title })
    }),
    onSuccess: () => {
      // queryClient.prefetchQuery //! fetch the data in the background and update the cache
      // queryClient.setQueryData(['posts', 1], "data") //! set data on your own to implement optimistic updates
      queryClient.invalidateQueries({ queryKey: ['posts'] }) //todo when have a dependency on some data and that data changes then we can use this to refetch the data
    }
  })

  if(postsQuery.isLoading) return <div>Loading...</div>
  if(postsQuery.isError) return <div>Error: {(postsQuery.error as Error).message}</div>

  return (
    <>
      {postsQuery.data?.map((post, index) => (
        <div key={index}>
          <h3>{post.id}</h3>
          <p className='p-tag'>{post.title}</p>
        </div>
      ))}
      <button disabled={newPost.isPending}  onClick={() => newPost.mutate()}>
        Add Post
      </button>
      <button onClick={() => setCurrentPage(<Page id={1} />)}>
        First Post
      </button>
      {currentPage}
    </>
  )
}

export default App

function wait(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration))
}