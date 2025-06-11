
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import TourBookingForm from './TourBookingForm';
import { Tour } from '@/types/TourTypes';

type TourEnquiryFormProps = {
  handleClose: () => void;
  open: boolean;
  bookingAvailability: number;
  tour:Tour
};

const TourEnquiryForm = ({
  handleClose,
  open,
  bookingAvailability,
  tour
}: TourEnquiryFormProps) => {
  const [showBookNow, setShowBookNow] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [numberOfPersons, setNumberOfPersons] = useState<number | ''>('');
  const [bookingDate, setBookingDate] = useState('');
  const [error, setError] = useState('');

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const handleEnquiry = () => {
    if (typeof numberOfPersons === 'number' && numberOfPersons <= bookingAvailability) {
      setShowBookNow(true);
      setError('');
    } else {
      setError(`Only ${bookingAvailability} spots available`);
      setShowBookNow(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Booking Enquiry</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Booking Date *"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="standard"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Number of People *"
          type="number"
          inputProps={{ min: 1 }}
          variant="standard"
          value={numberOfPersons}
          onChange={(e) => setNumberOfPersons(Number(e.target.value))}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
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
        {showBookingForm && <TourBookingForm handleClose={handleClose} tourId={tour._id}  operatorId={tour.tour_operator}  bookingDate={bookingDate}  numberOfPersons={numberOfPersons || 1} tour={tour} />}
      </DialogActions>
    </Dialog>
  );
};

export default TourEnquiryForm;
