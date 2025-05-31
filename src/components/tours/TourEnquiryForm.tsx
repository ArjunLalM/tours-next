import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import TourBookingForm from './TourBookingForm';
type TourEnquiryForm = {
  handleClose: () => void;
};
const TourEnquiryForm = ({handleClose}:TourEnquiryForm) => {
    const [showBookNow, setShowBookNow] = useState(false);
    const [showBookingForm, setShowBookingForm] = useState(false);
  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const handleEnquiry = () => {
    setShowBookNow(true);
  };
  return (
        <Dialog open={open} >
      <DialogTitle>Booking Enquiry</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Booking Date *"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="standard"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Number of People *"
          type="number"
          inputProps={{ min: 1 }}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button  color="error" onClick={ handleClose}>
          CANCEL
        </Button>
        {!showBookNow ? (
          <Button color="primary" onClick={handleEnquiry}>
            ENQUIRY
          </Button>
        ) : (
          <Button color="success" onClick={handleBookNow}>
            BOOK NOW
          </Button>
        )}
          {showBookingForm && <TourBookingForm handleClose={handleClose} />}
      </DialogActions>
    </Dialog>
  )
}

export default TourEnquiryForm


