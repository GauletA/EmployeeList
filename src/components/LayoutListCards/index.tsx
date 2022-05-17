
import { EmotionJSX } from "@emotion/react/types/jsx-namespace"
import styled from "@emotion/styled"
import { FormControl, Grid, Grow, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Tooltip } from "@mui/material"
import { useMemo, useState } from "react"
import { useUsersApi } from "./hooks"

const ContainerB = styled(Grid)`
    margin-bottom: 15px;
`
const CardG = styled(Grid)({
    borderRadius: '10px;',
    width: '90%',
    boxShadow: '2px 1px 5px #9b9c9a',
})
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
    padding-left: 10px;
    padding-right: 10px;
`
const TypoBreakLine = styled.p`
    text-decoration-line: underline;
    text-decoration-color: #ccccca;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`
const CardContainer = styled(Grid)`
    transform: scale(1);
    transition: all .22s ease-in-out; 
        &:hover {
            transform: scale(1.05);
        }
`

const Card = ({ind, picture, first, phone, email}: {ind: number, picture: {large: string}, first: string, phone: string, email: string}) => {

    console.log(ind)
    return (
        <Grow
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          {...(true ? { timeout: 500 * ind } : {})}
        >
            <CardContainer sx={{marginBottom: '15px'}} container item direction="column" alignItems="center" xs={6} sm={4} md={3}>
                <CardG container direction="column" item wrap="nowrap" >
                    <PictureBox item>
                        <Picture
                            src={picture.large}
                            alt="Grapefruit slice atop a pile of other slices" />
                    </PictureBox>
                    <TypoBox>
                        <TypoBreakLine>Name: {first} </TypoBreakLine>
                        <Tooltip title="Copy phone">
                            <TypoBreakLine onClick={() => {navigator.clipboard.writeText(phone)}}>Phone: {phone}</TypoBreakLine>
                        </Tooltip>
                        <Tooltip title="Copy email">
                            <TypoBreakLine onClick={() => {navigator.clipboard.writeText(email)}}>Gmail: {email}</TypoBreakLine>
                        </Tooltip>
                    </TypoBox>
                </CardG>
            </CardContainer>
        </Grow>
    )
}

const ContainerCards = ({users}: {users: any}) => {
    return (
        <ContainerB container item>
            {users.map(({picture, name, phone, email}: {picture: {large: string}, name: {first: string}, phone: string, email: string}, ind: number) => {
                let { first } = name
                return (<Card picture={picture} first={first} phone={phone} email={email} key={ind} ind={ind}/>)
            })}
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
                <MenuItem value={"nat=au&"}>Australia</MenuItem>
                <MenuItem value={"nat=fi&"}>Finland</MenuItem>
                <MenuItem value={"nat=nz&"}>New Zealand</MenuItem>
            </Select>
        </FormControl>
    )
}
const PaginationStyled = styled(Pagination)`
    
`

const PaginationContainer = ({handleNewPage}: {handleNewPage: Function}) => (
        <PaginationStyled count={10} variant="outlined"  onChange={(_, value) => {handleNewPage(value)}} />
    )

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

    return useMemo<EmotionJSX.Element>(function () {
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
    },[users])
}