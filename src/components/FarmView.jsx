// FarmView.jsx
import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { Typography, Paper, Divider, Button, Stack, Avatar, Box, Grid, Container } from '@mui/material';
import prices from '../config/gameConfig';


const getImage = (type) => {
  const lower = type.toLowerCase();
  if (lower.includes('cow')) return '/cow.png';
  if (lower.includes('pig')) return '/pig.png';
  if (lower.includes('corn')) return '/corn.png';
  if (lower.includes('wheat')) return '/wheat.png';
  return '/placeholder.png';
};

const sparkle = '/sparkle.png';

export default function FarmView(
  { farm, logs, systemLogs, day, onUpgradeAnimal, onUpgradeCrop, onNextDay, onAddAnimal, onAddCrop }
) {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img src="/PatternFarmLogo.png" alt="Pattern Farm Logo" width="300" style={{ marginBottom: 12 }} />
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>📋 Farm Summary</Typography>
        <Stack spacing={1}>
          <Typography>Farm Name: {farm.name}</Typography>
          <Typography>Day: {day}</Typography>
          <Typography>💰 Money: ${farm.money}</Typography>
          <Typography>🐄 Animals: {farm.animals.length}</Typography>
          <Typography>🌱 Crops: {farm.crops.length}</Typography>
        </Stack>

        <Box mt={3}>
          <Button variant="contained" color="success" onClick={onNextDay}>
            ▶️ Next Cycle
          </Button>
        </Box>

        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            id="add-resources"
            aria-controls="resource-menu"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            ➕ Add Resources
          </Button>
          <Menu
            id="resource-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{ 'aria-labelledby': 'add-resources' }}
          >
            <MenuItem onClick={() => { onAddAnimal('Cow'); setAnchorEl(null); }}>
  🐄 Add Cow (${prices.cow.buy}) - Daily Cost: ${prices.cow.dailyCost} - Daily Earnings: ${prices.cow.dailyRange[0]} - ${prices.cow.dailyRange[1]}
</MenuItem>
<MenuItem onClick={() => { onAddAnimal('Pig'); setAnchorEl(null); }}>
  🐖 Add Pig (${prices.pig.buy}) - Daily Cost: ${prices.pig.dailyCost} - Daily Earnings: ${prices.pig.dailyRange[0]} - ${prices.pig.dailyRange[1]}
</MenuItem>
<MenuItem onClick={() => { onAddCrop('Corn'); setAnchorEl(null); }}>
  🌽 Plant Corn (${prices.corn.buy}) - Daily Cost: ${prices.corn.dailyCost} - Daily Earnings: ${prices.corn.dailyRange[0]} - ${prices.corn.dailyRange[1]}
</MenuItem>
<MenuItem onClick={() => { onAddCrop('Wheat'); setAnchorEl(null); }}>
  🌾 Plant Wheat (${prices.wheat.buy}) - Daily Cost: ${prices.wheat.dailyCost} - Daily Earnings: ${prices.wheat.dailyRange[0]} - ${prices.wheat.dailyRange[1]}
</MenuItem>

          </Menu>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">🐄 Animals</Typography>
            <Stack spacing={1} mt={1}>
              {farm.animals.map((a, i) => (
                <Stack key={i} direction="row" spacing={2} alignItems="center">
                  <Avatar src={getImage(a.name)} alt={a.name} />
                  <Typography>{a.name} (Lvl {a.multiplier}) {a.multiplier > 1 && <img src={sparkle} alt="upgraded" width={16} style={{ display: 'inline' }} />}</Typography>
                  <Button size="small" variant="outlined" onClick={() => onUpgradeAnimal(i)}>
                    🆙 Upgrade (${prices.upgradeAnimal})
                  </Button>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">🌾 Crops</Typography>
            <Stack spacing={1} mt={1}>
              {farm.crops.map((c, i) => (
                <Stack key={i} direction="row" spacing={2} alignItems="center">
                  <Avatar src={getImage(c.name)} alt={c.name} />
                  <Typography>{c.name} (Lvl {c.multiplier}) {c.multiplier > 1 && <img src={sparkle} alt="upgraded" width={16} style={{ display: 'inline' }} />}</Typography>
                  <Button size="small" variant="outlined" onClick={() => onUpgradeCrop(i)}>
                    🌟 Upgrade (${prices.upgradeCrop})
                  </Button>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={1} mb={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1">🎮 Game Log</Typography>
            {logs.slice(-6).map((log, idx) => (
              <Typography key={idx} variant="body2">{log}</Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1">🛠️ System Log</Typography>
            {systemLogs.slice(-4).map((log, idx) => (
              <Typography key={idx} variant="body2">{log}</Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
