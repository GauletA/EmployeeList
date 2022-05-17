import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react"

export const useUsersApi = () => {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [nat, setNat] = useState("")
    // "nat=us&"

     const handleNewPage = useCallback((pg: number) => {
                setPage(pg)
        
     },[]) 

    const handleOtherNat = useCallback((nt: string) => {
                setNat(nt)
    },[]) 

    useEffect(() => {
        async function fetchData() {
            const request: {data: any} = await axios.get(`https://randomuser.me/api/?${nat}page=${page}&results=4&seed=abc`);
            setUsers(request.data.results)
        }
        fetchData()
    }, [page, nat])

    return {users, handleNewPage, handleOtherNat}
}