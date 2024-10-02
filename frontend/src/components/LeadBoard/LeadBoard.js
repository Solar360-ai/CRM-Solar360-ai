import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ItemTypes = {
  CARD: 'card',
};

const CardItem = ({ id, text, moveCard }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Card ref={drag} style={{ opacity: isDragging ? 0.5 : 1, marginBottom: '8px' }}>
      <CardContent>
        <Typography>{text}</Typography>
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
        <CardItem key={card.id} id={card.id} text={card.text} moveCard={moveCard} />
      ))}
    </Box>
  );
};

const LeadBoard = () => {
  const [cards, setCards] = React.useState([
    { id: 1, text: 'Aksol and Vimal', column: 'Cold Lead' },
    { id: 2, text: 'Lead 2', column: 'Cold Lead' },
  ]);

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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