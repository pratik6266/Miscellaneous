import { useQuery } from '@tanstack/react-query'
import React, {  } from 'react'
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../store/store';

const Data: React.FC = () => {

  // const dispatch = useDispatch();
  // const storeData = useSelector((state: RootState) => (state.tableData.data));
  // const storeData2 = useSelector((state: RootState) => (state.tableData.data2));
  // const loading = useSelector((state: RootState) => (state.tableData.loading));
  // const error = useSelector((state: RootState) => (state.tableData.error));

  // console.log(storeData, storeData2)

  // useEffect(() => {
  //   dispatch({ type: 'tableData/fetchData' });
  //   dispatch({ type: 'tableData/postData', payload: { id: 1, name: "Pratik Raj1" } });
  // }, [dispatch]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('http://localhost:3003/data2').then(res => res.json())
  });

  return (
    <>
      {isLoading && <p>loading..</p>}
      {error && <p>{(error as Error).message}</p>}
      {data && !isLoading && !error && Array.isArray(data) && data.map((value, index) => (
        <p key={index}>{JSON.stringify(value)}</p>
      ))}
      {/* {storeData2 && typeof storeData2 === 'object' && 'id' in storeData2 && 'name' in storeData2 && (
        <>
          <p>{(storeData2 as { id: number; name: string }).id}</p>
          <p>{(storeData2 as { id: number; name: string }).name}</p>
        </>
      )} */}
    </>
  )
}

export default Data