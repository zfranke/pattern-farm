import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

export default function TitleScreen({ onNewGame, onLoadGame, onAbout }) {
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
      {/* Add the logo image here */}
      <img 
        src="/PatternFarmLogo.png" 
        alt="Pattern Farm Logo" 
        style={{ width: '250px', marginBottom: '20px' }} 
      />
      
      <Typography variant="h3" gutterBottom align="center">
        Welcome to Pattern Farm!
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" color="primary" fullWidth onClick={onNewGame}>
          Start New Game
        </Button>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Button variant="outlined" color="secondary" fullWidth onClick={onLoadGame}>
          Load Game
        </Button>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Button variant="text" color="default" fullWidth onClick={onAbout}>
          About
        </Button>
      </Box>
    </Container>
  );
}

