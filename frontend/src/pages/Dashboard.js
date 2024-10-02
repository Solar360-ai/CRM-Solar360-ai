import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import LeadBoard from '../components/LeadBoard/LeadBoard';

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
    contactName: '',
    location: '',
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

  const handleSubmit = () => {
    // Add the new lead to the Cold Lead column in LeadBoard
    LeadBoard.addLead(newLead);
    handleClose();
  };

  return (
    <div>
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
              id="contactName"
              label="Contact Name"
              name="contactName"
              autoComplete="contact-name"
              value={newLead.contactName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              autoComplete="location"
              value={newLead.location}
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