import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const App = () => {

  interface ApiResponse {
    message: string;
    // add other fields if needed
  }

  const query = useQuery<ApiResponse>({
    queryKey: ['hello'],
    queryFn: async () => {
      const response = await axios.get<ApiResponse>('http://localhost:4001/api/hello');
      return response.data;
    }
  })

  return (
    <>
      {query.isLoading && <h1>Loading...</h1>}
      {query.isError && <h1>Error occurred: {JSON.stringify(query.error)}</h1>}
      {query.data && <h1>Data: {JSON.stringify(query?.data?.message)}</h1>}
    </>
  )
}

export default App