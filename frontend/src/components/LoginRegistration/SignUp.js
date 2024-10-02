import React from 'react';
import { Container, TextField, Button, Typography, CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import solar360 from 'C:/Users/anike/OneDrive/Documents/GitHub/CRM-Solar360-ai/frontend/src/solar360.jpg'; // Adjust the path as necessary

// Create a custom theme with the specified color
const theme = createTheme({
  palette: {
    primary: {
      main: '#fcbf49', // Custom color
    },
  },
});

function SignUp() {
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
            <img src={solar360} alt="Solar 360" style={{ width: '100%', marginBottom: '20px' }} />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="contactNumber"
              label="Contact Number"
              name="contactNumber"
              autoComplete="contact-number"
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              sx={{ mt: 1, mb: 2 }}
              onClick={() => {
                // Handle Google sign-up logic here
              }}
            >
              Sign Up with Google
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;