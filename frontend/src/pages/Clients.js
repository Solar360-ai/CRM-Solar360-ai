import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Company', width: 130 },
  { field: 'lastName', headerName: 'Location', width: 130 },
  {
    field: 'age',
    headerName: 'Quotation Amount(in Lakhs)',
    type: 'number',
    width: 90,
  },
];

const rows = [
  { id: 1, lastName: 'Pune', firstName: 'Aksol and Vimal', age: 10 },
  { id: 2, lastName: 'Mumbai', firstName: 'SYC', age: 42 },
  { id: 3, lastName: 'Kolhapur', firstName: 'ABC', age: 45 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState(0);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    setActiveTab(0);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <Typography id="modal-title" variant="h6" component="h2">
              {selectedRow.firstName}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Location: {selectedRow.lastName}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Quotation Amount: {selectedRow.age} Lakhs
            </Typography>
          </>
        );
      case 1:
        return <Typography>Notes content goes here...</Typography>;
      case 2:
        return <Typography>Emails content goes here...</Typography>;
      case 3:
        return <Typography>Files content goes here...</Typography>;
      case 4:
        return <Typography>Timeline content goes here...</Typography>;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        p: 2,
      }}
    >
      <Paper
        sx={{
          height: 400,
          width: '80%',
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={paginationModel.pageSize}
          onRowClick={handleRowClick}
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid #e0e0e0',
            },
          }}
        />
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600, // Increased width
            height: 400, // Increased height
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2, // Add border radius
          }}
        >
          {selectedRow && (
            <>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="modal tabs"
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  mb: 2,
                }}
              >
                <Tab label="Info" />
                <Tab label="Notes" />
                <Tab label="Emails" />
                <Tab label="Files" />
                <Tab label="Timeline" />
              </Tabs>
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: '#f9f9f9', // Light background for content
                  borderRadius: 1, // Add border radius to content
                }}
              >
                {renderTabContent()}
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}