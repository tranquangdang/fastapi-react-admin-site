import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Cookies from 'js-cookie';
import Validation from '../helper/validation';
const url = process.env.REACT_APP_HOST;

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [error, setError] = useState({ name: '', account: '', password: '' });
  const [signUp, setSignUp] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: AlertColor;
  }>({
    message: '',
    type: 'error',
  });

  useEffect(() => {
    if (Cookies.get('access_token'))
      axios
        .get(`${url}/token`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setLogin(true);
          }
        });
  }, []);

  if (login) {
    return <Navigate to="/admin" />;
  }
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ ...alert, message: '' });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const account = data.get('account');
    const password = data.get('password');

    const validate = () => {
      let field: any = {};
      field.name = signUp ? Validation.isNotNull(data.get('name')) : '';
      field.account = Validation.isNotNull(account);
      field.password = Validation.isNotNull(password);

      setError({ ...field });
      return Object.values(field).every((error) => error === '');
    };

    if (!validate()) {
      return;
    }
    if (signUp) {
      axios
        .post(`${url}/admin/signup`, {
          name: data.get('name'),
          account: data.get('account'),
          password: data.get('password'),
        })
        .then((res) => {
          if (res.status === 200) {
            setSignUp(false);
          }
          setAlert({ message: 'Sign up successfully!', type: 'success' });
          setSignUp(false);
        })
        .catch((err) => {
          setAlert({ message: err.response.data.detail, type: 'error' });
        });
    } else {
      axios
        .post(
          `${url}/admin/login`,
          {
            account: data.get('account'),
            password: data.get('password'),
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setLogin(true);
            const user = JSON.stringify(res.data);
            localStorage.setItem('user', user);
          }
        })
        .catch((err) => {
          setAlert({ message: err.response.data.detail, type: 'error' });
        });
    }
  };

  const handleType = (name: 'name' | 'account' | 'password') => {
    if (error[name] !== '') {
      setError({ ...error, [name]: '' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {signUp ? 'Sign Up' : 'Login'}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {signUp && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onKeyDown={() => handleType('name')}
                {...(error.name && {
                  error: true,
                  helperText: error.name,
                })}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="Account"
              name="account"
              autoComplete="account"
              autoFocus
              onKeyDown={() => handleType('account')}
              {...(error.account && {
                error: true,
                helperText: error.account,
              })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onKeyDown={() => handleType('password')}
              {...(error.password && {
                error: true,
                helperText: error.password,
              })}
            />
            <Grid container>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => setSignUp(!signUp)}
                >
                  {signUp
                    ? 'Have an account? Login'
                    : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {signUp ? 'Sign Up' : 'Login'}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Snackbar
        open={alert?.message ? true : false}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
