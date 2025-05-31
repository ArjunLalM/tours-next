import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
type TourReviewForm = {
  handleClose: () => void;
};

const ToursReviewForm = ({ handleClose }: TourReviewForm) => {
  return (
 <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Review</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Rating *"
          variant="standard"
          type="number"
          inputProps={{ min: 1, max: 5 }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Review *"
          variant="standard"
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          CANCEL
        </Button>
        <Button color="success">
          SUBMIT
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ToursReviewForm




