
import { EmotionJSX } from "@emotion/react/types/jsx-namespace"
import styled from "@emotion/styled"
import { FormControl, Grid, Grow, InputLabel, MenuItem, Pagination, Paper, Select, SelectChangeEvent, Tooltip } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useUsersApi } from "./hooks"

const ContainerB = styled(Grid)`
    margin-bottom: 15px;
`

const Picture = styled.img`
    border-radius: 25% 10%;
    width: 100%;
`
const TypoLayout = styled(Grid)`
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 15% 15%;
    padding-left: 10px;
    padding-right: 10px;
`
const TypoBreakLine = styled.p`
    text-decoration-line: underline;
    text-decoration-color: #ccccca;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-weight: 1000;
`

const WrapAnim = ({users}: {users?: any,}) => {
    const [active, setActive]: [any, Function] = useState([])

    const func = (el: any, ind: number) => {
        let tb = [...el]
        tb.splice(ind, 1, ind);
        return tb
    }
    useEffect(() => {
        setActive([])
        users.forEach((nu: any, ind: number) => {
            setTimeout(() => {
              setActive((el: any) => func(el, ind))
            }, ind * 240);
          })
    },[users])
    
    return (
        <Grid container item>
            {users.map(({picture, name, phone, email}: {picture: {large: string}, name: {first: string}, phone: string, email: string}, ind: number) => {
                let { first } = name
                return (<Card picture={picture} first={first} phone={phone} email={email} key={ind} ind={ind} active={active[ind]}/>)
            })}
        </Grid>
    )
}

const GridZoom = styled(Grid)`
    transform: scale(1);
    transition: all .22s ease-in-out; 
        &:hover {
            transform: scale(1.05);
        }
`

const PictureCard = ({src}: {src: string}) => (
    <Grid item >
        <Picture src={src} alt="Picture user" />
    </Grid>
)

const TypoCard = ({first, phone, email}: {first: string, phone: string, email: string}) => (
    <TypoLayout>
        <TypoBreakLine>Name: {first} </TypoBreakLine>
        <Tooltip title="Copy phone">
            <TypoBreakLine onClick={() => {navigator.clipboard.writeText(phone)}}>Phone: {phone}</TypoBreakLine>
        </Tooltip>
        <Tooltip title="Copy email">
            <TypoBreakLine onClick={() => {navigator.clipboard.writeText(email)}}>Gmail: {email}</TypoBreakLine>
        </Tooltip>
    </TypoLayout>
)

const Card = ({ind, picture, first, phone, email, active}: {ind: number, picture: {large: string}, first: string, phone: string, email: string, active: number}) => {

    const act = ind === active ? true : false
    return (
        <GridZoom container item direction="column" alignItems="center" xs={6} sm={4} md={3}>
            <Grow
            in={act}
            style={{ transformOrigin: 'center' }}
            {...(act ? { timeout: 800 } : {})}
            >
                <Grid sx={{marginBottom: '25px', }} container item alignItems="center" justifyContent={'center'}>
                    <Grid container direction="column" item wrap="nowrap" sx={{width: '90%'}} >
                        <PictureCard src={picture.large} />
                        <TypoCard first={first} phone={phone} email={email} />
                    </Grid>
                </Grid>
            </Grow>
        </GridZoom>
    )
}

const ContainerCards = ({users}: {users: any}) => {
    return (
        <ContainerB container item>
           <WrapAnim users={users} />
        </ContainerB>
    )
}


const MenuItemS = styled(MenuItem)`
   border-radius: 20px;
`

const Filter = ({handleOtherNat}: {handleOtherNat: Function}) => { 
    const [nats, setNats] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        handleOtherNat(event.target.value)
        setNats(event.target.value as string);
    };

    return (
        <FormControl fullWidth color='primary'>
            <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={nats}
                label="Nationality"
                onChange={handleChange}
                sx={{backgroundColor: "rgba(255, 255, 255, 0.253)"}}
            >
                <MenuItemS value={""}>All</MenuItemS>
                <MenuItemS value={"nat=fr&"}>French</MenuItemS>
                <MenuItemS value={"nat=us&"}>English</MenuItemS>
                <MenuItemS value={"nat=au&"}>Australia</MenuItemS>
                <MenuItemS value={"nat=fi&"}>Finland</MenuItemS>
                <MenuItemS value={"nat=nz&"}>New Zealand</MenuItemS>
            </Select>
        </FormControl>
    )
}

const PagContainer = styled.div`
    opacity: 0.4;

    &:hover {
        opacity: 1;
    }
`

const PaginationContainer = ({handleNewPage}: {handleNewPage: Function}) => (
    <PagContainer style={{position: 'absolute', bottom: '7%'}}>
        <Paper sx={{padding: "6px", borderRadius: "15px"}} >
            <Pagination count={10} variant="outlined" onChange={(_, value) => {handleNewPage(value)}} />
        </Paper>
    </PagContainer>
        )

const FilterGrid = styled(Grid)`
    width: 15%;
    min-width: 200px;
    margin-bottom: 35px;
`

const PaginationGrid = styled(Grid)`
    bottom: 2.5%;
    left: 0%;
    position: fixed;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ContainGrid = styled(Grid)`
    margin-top: 40px;
`

export const LayoutListCards = () => {
    const {users, handleNewPage, handleOtherNat} = useUsersApi()

    return useMemo<EmotionJSX.Element>(function () {
        return (
            <ContainGrid container item direction="column" alignItems="center" xs={12} sm={10} md={10}>
                <FilterGrid>
                    <Filter handleOtherNat={handleOtherNat} />
                </FilterGrid>
                <ContainerCards users={users}/>
                <PaginationGrid>
                    <PaginationContainer handleNewPage={handleNewPage} />
                </PaginationGrid>
            </ContainGrid>
        )
    },[users])
}