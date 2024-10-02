import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';

const VisuallyHiddenInput = styled('input')({
  display: 'none',
});

function SmartQuotation() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [units, setUnits] = useState('');
  const [amount, setAmount] = useState('');
  const [entries, setEntries] = useState([]);

  const [todZoneUnits, setTodZoneUnits] = useState({
    '2200-0600': '',
    '0600-0900_1200-1800': '',
    '0900-1200': '',
    '1800-2200': '',
  });

  const handleAdd = () => {
    const newEntry = { month, year, units, amount };
    setEntries([...entries, newEntry]);
    setMonth('');
    setYear('');
    setUnits('');
    setAmount('');
  };

  const handleSubmit = () => {
    console.log('Submitted entries:', entries);
    // Add your submit logic here
  };

  const handleTodZoneChange = (zone, value) => {
    setTodZoneUnits((prev) => ({
      ...prev,
      [zone]: value,
    }));
  };

  const handleTodZoneSubmit = () => {
    console.log('Submitted TOD Zone units:', todZoneUnits);
    // Add your submit logic here
  };

  return (
    <div>
      <h2>Smart Quotation</h2>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload Files
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => console.log(event.target.files)}
          multiple
        />
      </Button>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Units"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        {entries.map((entry, index) => (
          <Typography key={index}>
            {entry.month} {entry.year} - {entry.units} Units - ${entry.amount}
          </Typography>
        ))}
      </Box>
      <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>

      <h3>TOD Zone Units</h3>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="2200 Hrs - 0600 Hrs"
          value={todZoneUnits['2200-0600']}
          onChange={(e) => handleTodZoneChange('2200-0600', e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="0600 Hrs - 0900 Hrs & 1200 Hrs - 1800 Hrs"
          value={todZoneUnits['0600-0900_1200-1800']}
          onChange={(e) => handleTodZoneChange('0600-0900_1200-1800', e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="0900 Hrs - 1200 Hrs"
          value={todZoneUnits['0900-1200']}
          onChange={(e) => handleTodZoneChange('0900-1200', e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="1800 Hrs - 2200 Hrs"
          value={todZoneUnits['1800-2200']}
          onChange={(e) => handleTodZoneChange('1800-2200', e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleTodZoneSubmit} sx={{ mt: 2 }}>
          Submit TOD Zone Units
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        {Object.entries(todZoneUnits).map(([zone, units], index) => (
          <Typography key={index}>
            {zone.replace('_', ' & ')}: {units} Units
          </Typography>
        ))}
      </Box>
    </div>
  );
}
    
export default SmartQuotation;