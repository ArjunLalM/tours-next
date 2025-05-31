"use client";
import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { TextField } from "@mui/material";
import Link from "next/link";
import { Guide } from "@/types/GuideTypes";

const schema = yup.object().shape({
  tourAgencyName: yup.string().required("Tour agency name is required"),
  agencyLocation: yup.string().required("Location is required"),
  companyPhoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Must be 10 digits"),
  companyEmailId: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Min 8 characters")
    .matches(/[A-Z]/, "1 uppercase letter")
    .matches(/[a-z]/, "1 lowercase letter")
    .matches(/[0-9]/, "1 number")
    .matches(/[@$!%*?&]/, "1 special character"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const GuideRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data:Guide) => {
    try {
     

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/operatorSignup`,
      data
      );

      toast.success("Registered successfully! Redirecting...");
        localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("operatorId", response.data.userId);
      setTimeout(() => router.push("/login"), 2000);
    } catch {
       ;
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Register as a Guide
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="mt-5">
            <TextField
              label="Tour Agency Name"
              fullWidth
              {...register("tourAgencyName")}
              error={!!errors.tourAgencyName}
              helperText={errors.tourAgencyName?.message}
            />
            </div>
            <div className="mt-5">
            <TextField
              label="Agency Location"
              fullWidth
              {...register("agencyLocation")}
              error={!!errors.agencyLocation}
              helperText={errors.agencyLocation?.message}
            />
            </div>
            <div className="mt-5">
            <TextField
              label="Company Phone Number"
              fullWidth
              {...register("companyPhoneNumber")}
              error={!!errors.companyPhoneNumber}
              helperText={errors.companyPhoneNumber?.message}
            />
            </div>
            <div className="mt-5">
            <TextField
              label="Company Email"
              fullWidth
              {...register("companyEmailId")}
              error={!!errors.companyEmailId}
              helperText={errors.companyEmailId?.message}
            />
            </div>

            {/* Password Field */}
            <div className="relative">
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-2 text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                {...register("passwordConfirm")}
                error={!!errors.passwordConfirm}
                helperText={errors.passwordConfirm?.message}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-2 text-sm text-gray-600"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-indigo-500"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already registered?{" "}
            <Link href="/login" className="text-indigo-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default GuideRegister;
