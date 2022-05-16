import styled from "@emotion/styled"
import { FormControl, Grid, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { useUsersApi } from "./hooks"

// import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';
// const theme = unstable_createMuiStrictModeTheme();

const ContainerB = styled(Grid)`
    margin-bottom: 15px;
`

const CardG = styled(Grid)`
    border-radius: 10px;
    width: 90%;
    margin-bottom: 15px;
    box-shadow: 2px 1px 5px #9b9c9a;
`

const PictureBox = styled(Grid)`
    border-top-left-radius: 10px;
    border-top-right-radius: 10px; 
`

const Picture = styled.img`
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%; 
`

const TypoBox = styled(Grid)`
    padding-left: 10px 
`
const TypoBreakLine = styled.p`
    overflow-wrap: break-word;
    text-decoration-line: underline;
    text-decoration-color: #ccccca;
`

const Card = () => {
    return (
        <Grid container item direction="column" alignItems="center" xs={6} sm={4} md={3}>
            <CardG container direction="column" item wrap="nowrap" >
                    <PictureBox item>
                        <Picture
                            src="https://randomuser.me/api/portraits/men/86.jpg"
                            alt="Grapefruit slice atop a pile of other slices" />
                    </PictureBox>
                    <TypoBox item >
                        <TypoBreakLine>Name: Nick </TypoBreakLine>
                        <TypoBreakLine>Phone: 06 23 43 43 54</TypoBreakLine>
                        <TypoBreakLine>Gmail: flo.sdsd.alex@gmail.com</TypoBreakLine>
                    </TypoBox>
            </CardG>
        </Grid>
    )
}

const ContainerCards = ({users}: {users: any}) => {

    return (
        <ContainerB container item>
            {users.map(() => (<Card />))}
        </ContainerB>
    )
}

const Filter = ({handleOtherNat}: {handleOtherNat: Function}) => {
    const [nats, setNats] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        handleOtherNat(event.target.value)
        setNats(event.target.value as string);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={nats}
                label="Nationality"
                onChange={handleChange}
            >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={"nat=fr&"}>French</MenuItem>
                <MenuItem value={"nat=us&"}>English</MenuItem>
            </Select>
        </FormControl>
    )
}

const PaginationContainer = ({handleNewPage}: {handleNewPage: Function}) => {
    return (
        <Pagination count={10} variant="outlined"  onChange={(event, value) => {console.log(`PAge: ${value}`)}} />
    )
}

const FilterGrid = styled(Grid)`
    width: 15%;
    min-width: 80px;
    margin-bottom: 35px;
`

const PaginationGrid = styled(Grid)`
    margin-top: 35px;
`

export const LayoutListCards = () => {
    const {users, handleNewPage, handleOtherNat} = useUsersApi()

    return (
        <Grid container item direction="column" alignItems="center" xs={12} sm={10} md={10}>
            <FilterGrid>
                <Filter handleOtherNat={handleOtherNat} />
            </FilterGrid>
            <ContainerCards users={users}/>
            <PaginationGrid>
                <PaginationContainer handleNewPage={handleNewPage} />
            </PaginationGrid>
        </Grid>
    )
}