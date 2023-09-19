import {Select, MenuItem, FormControl, InputLabel, Typography, TextField, Container, Grid} from "@mui/material";
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack';

import PlotlyChart from "../../../pages/chart"

const StyledPaper = styled(Paper)({
    display: 'flex',
    flexDirection: 'column', 
    padding: '2%', 
    minWidth: '13%', 
    alignItems:'center', 
    textAlign: 'center'
  })
const Home = () =>{
    return<>
        <Stack spacing={7} direction="row" alignItems="center" justifyContent="center" display={"flex"} paddingTop={'3%'} >
                <StyledPaper elevation={3} >
                <Typography style={{ fontSize: '200%' }}>80</Typography>
                <Typography>Hosts</Typography>
                </StyledPaper>
                <StyledPaper elevation={3} >
                <Typography style={{ fontSize: '200%' }}>14</Typography>
                <Typography>Projects</Typography>
                </StyledPaper>
                <StyledPaper elevation={3} >
                <Typography style={{ fontSize: '200%' }}>8</Typography>
                <Typography>Organizations</Typography>
                </StyledPaper>
                <StyledPaper elevation={3} >
                <Typography style={{ fontSize: '200%' }}>70</Typography>
                <Typography>Programs</Typography>
                </StyledPaper>
                <StyledPaper elevation={3} >
                <Typography style={{ fontSize: '200%' }}>150</Typography>
                <Typography>Jobs</Typography>
                </StyledPaper>
            </Stack>

            <div style={{padding:'2% 5% 5% 5%',}}>
                <PlotlyChart />
            </div>
    </>
}

export default Home