import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';

export default function About({ onBack }) {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
        About Pattern Farm
      </Typography>

      <Typography variant="body1" paragraph>
        Pattern Farm is a simple farming simulation game where you manage crops and animals to earn money. 
        Use your profits to upgrade and expand your farm. Beware of random events that may affect your farm’s progress!
      </Typography>

      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" fullWidth onClick={onBack}>
          Back to Title Screen
        </Button>
      </Box>
    </Container>
  );
}
