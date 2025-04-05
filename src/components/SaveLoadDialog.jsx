import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

export default function SaveLoadDialog({ open, onClose, onSave, onLoad, savedGames }) {
  const [saveName, setSaveName] = useState('');
  const [isSaving, setIsSaving] = useState(true); // Switch between Save/Load mode

  const handleSave = () => {
    if (saveName.trim()) {
      onSave(saveName); // Pass the saveName to onSave handler
      setSaveName('');
      setIsSaving(false);
    }
  };

  const handleLoad = (gameName) => {
    onLoad(gameName); // Pass the game name to onLoad handler
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isSaving ? 'Save Game' : 'Load Game'}</DialogTitle>
      <DialogContent>
        {isSaving ? (
          <TextField
            label="Enter Save Name"
            variant="outlined"
            fullWidth
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            margin="normal"
          />
        ) : (
          <List>
            {savedGames.map((game, idx) => (
              <ListItem button key={idx} onClick={() => handleLoad(game)}>
                <ListItemText primary={game} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        {isSaving ? (
          <>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setIsSaving(true)} color="secondary">
              Back to Save
            </Button>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
