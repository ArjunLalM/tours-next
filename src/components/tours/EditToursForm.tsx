/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {  EditTourAction } from "@/store/Tours";
import { AppDispatch } from "@/store";
import { toast } from "react-toastify";
import { Tour } from '@/types/TourTypes';

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  destination: yup.string().required("Destination is required"),
  duration: yup
    .number()
    .typeError("Duration must be a number")
    .required("Duration is required")
    .positive()
    .integer(),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive(),
  availability: yup
    .number()
    .typeError("Availability must be a number")
    .required("Availability is required")
    .positive()
    .integer(),
  activityTypes: yup.string().required("Activity Type is required"),
  latitude: yup
    .number()
    .required("Latitude is required")
    .typeError("Latitude must be a number"),
  longitude: yup
    .number()
    .required("Longitude is required")
    .typeError("Longitude must be a number"),
});

type FormData = {
  title: string;
  description: string;
  destination: string;
  duration: number;
  price: number;
  availability: number;
  activityTypes: string;
  latitude: number;
  longitude: number;
};

type TourAddingForm = {
  onSave: () => void;
  handleClose: () => void;
  tour:Tour;
  tourId: string;
};

const EditToursForm = ({ handleClose ,onSave,tour,tourId}: TourAddingForm) => {
 const [richText, setRichText] = useState("");
  const [images, setImages] = useState<File[]>([]);

    const {
      register,
      handleSubmit,
      setValue,
        reset,
      formState: { errors },
    } = useForm<FormData>({
      resolver: yupResolver(schema),
    });
  

    useEffect(() => {
        setValue("description", richText);
      }, [richText, setValue]);
    
      const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
          const fileArray = Array.from(files);
          setImages(fileArray);
        }
      };
      useEffect(() => {
      if (tour) {
        console.log(tour, 'tour')
        reset(tour)
      }
    
    }, [tour])
      const useAppDispatch = useDispatch.withTypes<AppDispatch>();
      const dispatch = useAppDispatch();
    
    const onSubmit = (data: FormData) => {
  try {
    const formData = new FormData();

    formData.append("tourId", tourId);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("destination", data.destination);
    formData.append("duration", data.duration.toString());
    formData.append("price", data.price.toString());
    formData.append("availability", data.availability.toString());
    formData.append("activityTypes", data.activityTypes);

    // Append coordinates as JSON string
    const coordinates = {
      type: "Point",
      coordinates: [Number(data.longitude), Number(data.latitude)], // IMPORTANT: [long, lat]
    };
    formData.append("coordinates", JSON.stringify(coordinates));

    // Append multiple images one by one under the same key
    images.forEach((file) => {
      formData.append("cover_image", file);
    });

    dispatch(EditTourAction({data:formData}))
      .unwrap()
      .then(() => {
        toast.success("Tour updated successfully!");
        onSave();
      })
      .catch(() => {
        toast.error("Failed to update tour. Please try again.");
      });
  } catch (error) {
    console.error(error);
    toast.error("Failed to update tour. Please try again.");
  }
};

  return (
     <div className="relative">
          <div className="fixed inset-0 bg-white z-50 overflow-auto animate-slide-down p-8">
            <form
              className="space-y-6 max-w-3xl mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  placeholder="Enter tour title"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>
    
              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <ReactQuill
                  theme="snow"
                  value={richText}
                  onChange={setRichText}
                  className="border border-gray-300 rounded"
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
    
              {/* Destination & Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Destination</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    placeholder="Enter destination"
                    {...register("destination")}
                  />
                  {errors.destination && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.destination.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    placeholder="Enter duration"
                    {...register("duration")}
                  />
                  {errors.duration && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.duration.message}
                    </p>
                  )}
                </div>
              </div>
    
              {/* Price & Availability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    placeholder="Enter price"
                    {...register("price")}
                  />
                  {errors.price && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Availability (Persons)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    placeholder="Number of persons"
                    {...register("availability")}
                  />
                  {errors.availability && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.availability.message}
                    </p>
                  )}
                </div>
              </div>
    
              {/* Activity Type */}
              <div>
                <label className="block text-sm font-medium mb-1">Activity Type</label>
                <select
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  {...register("activityTypes")}
                >
                  <option value="">Select activity type</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Nature">Nature</option>
                  <option value="Cultural">Cultural</option>
                </select>
                {errors.activityTypes && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.activityTypes.message}
                  </p>
                )}
              </div>
    
              {/* Coordinates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    placeholder="Enter latitude"
                    {...register("latitude")}
                  />
                  {errors.latitude && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.latitude.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    placeholder="Enter longitude"
                    {...register("longitude")}
                  />
                  {errors.longitude && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.longitude.message}
                    </p>
                  )}
                </div>
              </div>
    
              {/* Highlight Upload */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Upload Highlight
                </label>
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  accept="image/*"
                  multiple
                  onChange={handleFile}
                />
              </div>
    
              {/* Itinerary */}
          
    
              {/* Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="text-red-600 font-medium"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
    
          <style jsx>{`
            .animate-slide-down {
              animation: slideDown 0.3s ease-out;
            }
            @keyframes slideDown {
              0% {
                transform: translateY(-100%);
                opacity: 0;
              }
              100% {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}</style>
        </div>
  );
};

export default EditToursForm;



