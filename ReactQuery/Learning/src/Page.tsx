import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getPost } from './api/getPost';

interface PageProps {
  id: number;
}

const Page: React.FC<PageProps> = ({ id }) => {

  const postQuery = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
  })

  if(postQuery.isLoading) return <div>Loading...</div>
  if(postQuery.isError) return <div>Error: {(postQuery.error as Error).message}</div>

  return (
    <>
      <h1>Lorem, ipsum dolor sit amet </h1>
      <div>{postQuery.data}</div>
    </>
  )
}

export default Page