import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const ItemTypes = {
  CARD: 'card',
};

const CardItem = ({ id,  name, phone, email, city, moveCard }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Card ref={drag} sx={{ opacity: isDragging ? 0.5 : 1, marginBottom: 2, boxShadow: 3, minWidth: 275 }}>
    <CardContent sx={{ textAlign: 'left' }}>
      <Typography variant="h5" component="div" sx = {{mb: 1.5 }}>
        {name}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <PhoneIcon sx={{ mr: 1, fontSize: 18 }} />
            <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon sx={{ mr: 1, fontSize: 18 }} />
            <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{email}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ mr: 1, fontSize: 18 }} />
          <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{city}</Typography>
        </Box>
       
    </CardContent>
  </Card>
  );
};

const Column = ({ title, cards, moveCard }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => moveCard(item.id, title),
  }));

  return (
    <Box ref={drop} sx={{ width: '25%', padding: '16px', backgroundColor: '#f0f0f0' }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {cards.map((card) => (
        <CardItem
          key={card.id}
          id={card.id}
          name={card.name}
          phone={card.phone}
          email={card.email}
          city={card.city}
          moveCard={moveCard}
        />
      ))}
    </Box>
  );
};

const LeadBoard = () => {
  // const [cards, setCards] = React.useState([
  //   { id: 1, text: 'Aksol and Vimal', column: 'Cold Lead' },
  //   { id: 2, text: 'Lead 2', column: 'Cold Lead' },
  // ]);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('http://localhost:8080/getRecordsList/getRecords');
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          const formattedData = data.map((lead, index) => ({
            id: index,
            name: `${lead.keyValues.First_Name} ${lead.keyValues.Last_Name}`,
            phone: lead.keyValues.Phone,
            email: lead.keyValues.Email,
            city: lead.keyValues.City, 
            column: 'Cold Lead', 
          }));
          setCards(formattedData);
        } else {
          console.error('Error fetching leads');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLeads();
  }, []);

  const moveCard = (id, newColumn) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, column: newColumn } : card
      )
    );
  };

  const columns = ['Cold Lead', 'Hot Lead', 'Closed Won', 'Closed Lost'];

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ display: 'flex' }}>
        {columns.map((column) => (
          <Column
            key={column}
            title={column}
            cards={cards.filter((card) => card.column === column)}
            moveCard={moveCard}
          />
        ))}
      </Box>
    </DndProvider>
  );
};

export default LeadBoard;