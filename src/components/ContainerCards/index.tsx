import styled from "@emotion/styled"
import { Grid } from "@mui/material"

// import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';
// const theme = unstable_createMuiStrictModeTheme();

const ContainerB = styled(Grid)`
    margin: 1%;
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
        <Grid container direction="column" alignItems="center" item xs={6} sm={4} md={3}>
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

export const ContainerCards = () => {
    return (
        <ContainerB container item xs={12} sm={10} md={10}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </ContainerB>
    )
}