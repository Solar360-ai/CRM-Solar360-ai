import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import LeadBoard from '../components/LeadBoard/LeadBoard';
import ButtonAppBar from '../components/Topbar/Topbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fcbf49', // Custom color
    },
  },
});
 
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    companyName: '',
    lastName: '',
    firstName: '',
    contactNumber: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prevLead) => ({
      ...prevLead,
      [name]: value,
    }));
  };

  // const handleSubmit = () => {
  //   // Add the new lead to the Cold Lead column in LeadBoard
  //   LeadBoard.addLead(newLead);
  //   handleClose();
  // };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/addlead/create-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLead),
      });

      if (response.ok) {
        console.log('Lead created successfully');
        LeadBoard.addLead(newLead);
        handleClose();
      } else {
        console.error('Error creating lead');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <ButtonAppBar />
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Lead
          </Button>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="add-lead-modal-title"
          aria-describedby="add-lead-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #e9ecef',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="add-lead-modal-title" variant="h6" component="h2">
              Add New Lead
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="companyName"
              label="Company Name"
              name="companyName"
              autoComplete="company-name"
              autoFocus
              value={newLead.companyName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="last-name"
              value={newLead.lastName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="Fisrt Name"
              name="firstName"
              autoComplete="firstName"
              value={newLead.firstName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="contactNumber"
              label="Contact Number"
              name="contactNumber"
              autoComplete="contact-number"
              value={newLead.contactNumber}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Add Lead
            </Button>
          </Box>
        </Modal>
      </ThemeProvider>
      <LeadBoard />
    </div>
  );
};

export default Dashboard;