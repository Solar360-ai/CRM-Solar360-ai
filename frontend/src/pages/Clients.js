import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ButtonAppBar from '../components/Topbar/Topbar';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'company', headerName: 'Company', width: 130 },
  { field: 'fullName', headerName: 'Full Name', width: 200 },
  { field: 'location', headerName: 'Location', width: 130 },
  { field: 'phone', headerName: 'Phone', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
];

export default function DataTable() {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/getRecordsList/getRecords');
      const data = await response.json();
      const formattedData = data.map((lead, index) => ({
        id: index,
        fullName: `${lead.keyValues.First_Name} ${lead.keyValues.Last_Name}`,
        phone: lead.keyValues.Phone,
        email: lead.keyValues.Email,
        location: lead.keyValues.City,
        company: lead.keyValues.Company, 
        column: 'Cold Lead', 
      }));
      setRows(formattedData);
    };
    fetchData();
  }, []);

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
              {selectedRow.company}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Phone: {selectedRow.phone}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Email: {selectedRow.email}
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
    <div>
      <ButtonAppBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
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
            pageSize={5}
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
              width: 600,
              height: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
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
                    bgcolor: '#f9f9f9',
                    borderRadius: 1,
                  }}
                >
                  {renderTabContent()}
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </div>
  );
}