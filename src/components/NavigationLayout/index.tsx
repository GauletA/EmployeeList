import styled from "@emotion/styled/"
import { Grid } from "@mui/material"
import { ChildrenProp } from "../../constants/typeTS"
import { jsx, css, keyframes } from '@emotion/react'

const bounce = keyframes`
0% {
  background-position: 0% 0%;
}
50% { 
  background-position: -150px 0%;
}
100% {
  background-position: 0% 0%;
}
`
const Layout = styled(Grid)`
  background-image: url("al.jpg");
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: scroll;
  animation: ${bounce} 20s linear infinite;
`


const NavigationLayout: React.FC<ChildrenProp> = ({children}) => {
    return (
    <Layout container justifyContent="center" >
        {children}
    </Layout>
    )
}

export default NavigationLayout