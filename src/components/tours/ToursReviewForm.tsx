import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { AddReviewAction, EditReviewAction } from "@/store/Reviews";
import { AppDispatch } from "@/store";
import { Reviews } from "@/types/ReviewType";

type FormData = {
  ratings: number;
  review: string;
  reviewId?: string | null;
};

interface TourReviewFormProps {
  open: boolean;
  handleClose: () => void;
  tourId: string;
  existingReview?: Reviews | null;
  isExistingReview?: boolean;
}

const schema = yup.object().shape({
  review: yup.string().required("Review is required"),
  ratings: yup
    .number()
    .typeError("Rating must be a number")
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5")
    .required("Rating is required"),
});

const TourReviewForm = ({
  open,
  handleClose,
  tourId,
  existingReview,
}: TourReviewFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      review: existingReview?.review || "",
      ratings: existingReview?.ratings || 1,
    },
  });

  // Reset and set default values when dialog opens or existingReview changes
  useEffect(() => {
    if (open) {
      reset({
        review: existingReview?.review || "",
        ratings: existingReview?.ratings || 1,
      });
    }
  }, [open, existingReview, reset]);

  const onSubmit = (data: FormData) => {

  if (existingReview) {
    console.log(existingReview,"ooooooooooo")
    dispatch(EditReviewAction({
      reviewId: existingReview._id,
      ratings: data.ratings,
      review: data.review,
      tourId
    }));
  } else {
    dispatch(AddReviewAction({
      ratings: data.ratings,
      review: data.review,
      tourId
    }));
  }

  handleClose();

};
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{existingReview ? "Edit Review" : "Add Review"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <TextField
            fullWidth
            label="Rating *"
            variant="standard"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            sx={{ mb: 2 }}
            {...register("ratings")}
            error={!!errors.ratings}
            helperText={errors.ratings?.message}
          />
          <TextField
            fullWidth
            label="Review *"
            variant="standard"
            multiline
            rows={4}
            {...register("review")}
            error={!!errors.review}
            helperText={errors.review?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            CANCEL
          </Button>
          <Button type="submit" color="success">
            SUBMIT
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TourReviewForm;
