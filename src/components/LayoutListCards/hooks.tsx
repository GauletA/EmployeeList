import axios from "axios";
import { useEffect, useState } from "react"

export const useUsersApi = () => {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [nat, setNat] = useState("")
    // "nat=us&"

    const handleNewPage = (page: number) => {
        if (page !== page)
            setPage(page)
    }
    const handleOtherNat = (nat: string) => {
        if (nat !== nat)
            setNat(nat)
    }

    useEffect(() => {
        async function fetchData() {
            const request: {results: []} = await axios.get(`https://randomuser.me/api/?${nat}page=${page}&results=1&seed=abc`);
            setUsers(request.results)
        }
        fetchData()
    }, [page, nat])

    return {users, handleNewPage, handleOtherNat}
}