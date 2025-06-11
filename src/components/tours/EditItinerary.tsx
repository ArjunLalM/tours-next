import React, { useEffect } from "react";
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
import { updateItinerary } from "@/store/Itinerary"; // You must define this action

type FormData = {
  itinerary: string;
};

interface EditItineraryFormProps {
  open: boolean;
  handleClose: () => void;
  tourId: string;
  itineraryId: string;
  currentDescription: string;
}

const EditItineraryForm = ({
  open,
  handleClose,
  tourId,
  itineraryId,
  currentDescription,
}: EditItineraryFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (open) {
      setValue("itinerary", currentDescription);
    }
  }, [open, currentDescription, setValue]);

  const onSubmit = (data: FormData) => {
    dispatch(
      updateItinerary({
        tourId,
        itineraryId,
        description: data.itinerary,
      })
    );
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Itinerary Day</DialogTitle>
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
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditItineraryForm;
