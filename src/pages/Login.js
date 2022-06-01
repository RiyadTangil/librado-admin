import toast from 'react-hot-toast';
import { useState } from 'react';
import swal from 'sweetalert';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography, Box } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { LoginForm } from '../sections/authentication/login';
import AuthSocial from '../sections/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundImage: 'url(/static/illustrations/login_bg.png)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));


// ----------------------------------------------------------------------

export default function Login() {
  const navigate = useNavigate();
  const [logState, setLogState] = useState(false)
  const handleLogin = (info) => {

    console.log('login info', info);
    const loading = toast.loading('Please wait...!');
    fetch("http://localhost:3333/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify({
        email: info.email,
        password: info.password
      })
    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        // setResponseData(data.data);
        if (!data.error) {
          navigate('/dashboard/app', { replace: true });
          toast.success(' logged in Successfully!')
          return
        }
        setLogState(true)
        toast.error("Something went wrong! Please try again.")
      })
      .catch(error => {
        toast.dismiss(loading);
        setLogState(true)
        toast.error("Something went wrong! Please try again.")
      })
  }
  return (
    <RootStyle title="Login">
      {/* <AuthLayout>
        Don’t have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          Get started
        </Link>
      </AuthLayout> */}

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Hi, Welcome Back
        </Typography> */}
        {/* <img sx={{ width: '100%' }} src="/static/illustrations/login_bg.png" alt="login" /> */}
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Welcome Back
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Enter your email and password to sign in
            </Typography>
          </Box>
          {/* <AuthSocial /> */}

          <LoginForm handleLogin={handleLogin} logState={logState} />

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: 'none' }
            }}
          >
            Don’t have an account?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to="register" underline="hover">
              Get started
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
