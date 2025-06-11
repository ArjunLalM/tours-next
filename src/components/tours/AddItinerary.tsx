import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addItinerary } from "@/store/Itinerary";

type FormData = {
  itinerary: string;
};

interface ItineraryFormProps {
  open: boolean;
  handleClose: () => void;
  tourId: string;
  currentItineraryLength: number;
}

const ItineraryForm = ({
  open,
  handleClose,
  tourId,
  currentItineraryLength,
}: ItineraryFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      itinerary: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const payload = {
      tourId,
      itinerary: [
        {
          step: currentItineraryLength + 1, 
          description: data.itinerary,
        },
      ],
    };

    dispatch(addItinerary(payload));
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Itinerary Day</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <TextField
            fullWidth
            label="Itinerary Description *"
            variant="standard"
            multiline
            rows={4}
            {...register("itinerary", { required: "Itinerary is required" })}
            error={!!errors.itinerary}
            helperText={errors.itinerary?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add Day
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ItineraryForm;
