
import { Button, Stack } from '@mui/material';

export default function Controls({onSave, onReset }) {
  return (
    <Stack spacing={2} direction="row" flexWrap="wrap" mb={4}>
      <Button variant="outlined" color="info" onClick={onSave}>
        💾 Save
      </Button>
      <Button variant="outlined" color="error" onClick={onReset}>
        🔄 Reset Pattern Farm
      </Button>
    </Stack>
  );
}
