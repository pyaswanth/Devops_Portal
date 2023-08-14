import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Grid } from '@mui/material';
import { green } from '@mui/material/colors';

// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 700,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 450,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  
  
}));

const logoStyle = {
  top:16,
  width:100,
  height:100,
}

const divStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}



// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  const logindiv = {
    width: '100%',
    height: '100%',
    padding: '20px',
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    borderRadius: '10px'
  };

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>

        {mdUp && (
          <StyledSection>
            {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography> */}
            <img src="/assets/illustrations/imgbg.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            {/* <Grid container > */}
            {/* <Grid item xs={12} sm={6} md={3}> */}
            <div style={divStyle}>
            <img src='/assets/illustrations/Kaar_Logo.png' alt="logo" style={logoStyle}/>
            <Typography variant="h4" gutterBottom>
              DevOps Portal
            </Typography>
            </div>

            {/* <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2">Get started</Link>
            </Typography> */}

            {/* <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack> */}

            <Divider sx={{ my: 3 }}>
              {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography> */}
            </Divider>
            <div style={logindiv}>
            <LoginForm />
            </div>
            {/* </Grid> */}
        {/* </Grid> */}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
