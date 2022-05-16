import styled from "@emotion/styled/"
import { Grid } from "@mui/material"
import { ChildrenProp } from "../../constants/typeTS"

const Layout = styled(Grid)`
  margin-top: 40px;
  margin-bottom: 40px;
`

const NavigationLayout: React.FC<ChildrenProp> = ({children}) => {
    return (
    <Layout container justifyContent="center" >
        {children}
    </Layout>
    )
}

export default NavigationLayout