import axios from "axios";
import { useCallback, useEffect, useState } from "react"

export const useUsersApi = () => {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [nat, setNat] = useState("")

     const handleNewPage = useCallback((pg: number) => {
                setPage(pg)
     },[]) 

    const handleOtherNat = useCallback((nt: string) => {
        setUsers([])
        setNat(nt)
    },[]) 

    useEffect(() => {
        async function fetchData() {
            const request: {data: any} = await axios.get(`https://randomuser.me/api/?${nat}page=${page}&results=12&seed=abc`);
            setUsers(request.data.results)
        }
        fetchData()
    }, [page, nat])

    return {users, handleNewPage, handleOtherNat}
}