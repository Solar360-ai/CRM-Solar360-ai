import React from 'react';
import { Container, TextField, Button, Typography, CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import solar360 from 'C:/Users/anike/OneDrive/Documents/GitHub/CRM-Solar360-ai/frontend/src/solar360.jpg'; // Import the logo

// Create a custom theme with yellow buttons
const theme = createTheme({
  palette: {
    primary: {
      main: '#fcbf49', // Yellow color
    },
    secondary: {    
        main: '#e26d5c', // Yellow color
        },
  },
});

function SignIn() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignUpClick = () => {
    navigate('/signup'); // Redirect to /signup
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
          <img src={solar360} alt="Solar 360" style={{ width: '300px', marginBottom: '10px' }} /> {/* Display the logo */}
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ mt: 1, mb: 2 }}
              onClick={handleSignUpClick}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;