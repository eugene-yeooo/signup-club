"use client";

import React, { useState } from "react";
import VantaBackground from "@/components/VantaBackground";

// Validation helpers
const isRequired = (value: string) => value.trim().length > 0;

const isGmail = (email: string) => {
  const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return pattern.test(email) && email.toLowerCase().endsWith("@gmail.com");
};

const isUniqueEmail = (email: string) =>
  email.trim().toLowerCase() !== "test@gmail.com";

const isValidPassword = (pwd: string) => {
  if (pwd.length < 8 || pwd.length > 30) return false;
  return (
    /[a-z]/.test(pwd) &&
    /[A-Z]/.test(pwd) &&
    /\d/.test(pwd) &&
    /[^A-Za-z0-9]/.test(pwd)
  );
};

// Component
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type Status = "idle" | "warning" | "failure" | "success";

export default function RegisterForm() {
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (v: FormValues): FormErrors => {
    const err: FormErrors = {};
    if (!isRequired(v.firstName)) err.firstName = "First name is required";
    if (!isRequired(v.lastName)) err.lastName = "Last name is required";

    if (!isRequired(v.email)) err.email = "Email is required";
    else if (!isGmail(v.email))
      err.email = "Email must be a valid Gmail address";
    else if (!isUniqueEmail(v.email))
      err.email = "This email is already registered";
    setStatus("failure");

    if (!isRequired(v.password)) err.password = "Password is required";
    else if (!isValidPassword(v.password))
      err.password =
        "Password must be 8–30 chars and include upper, lower, number & special character";

    return err;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      if (validation.email === "This email is already registered") {
        setStatus("failure");
      } else {
        setStatus("warning");
      }
    } else {
      setStatus("success");
    }
  };

  const resetForm = () => {
    setValues({ firstName: "", lastName: "", email: "", password: "" });
    setErrors({});
    setStatus("idle");
  };

  return (
    <VantaBackground>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-md"
        noValidate
      >
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Sign-Up Club 👇
        </h1>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            First Name
            <input
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm text-black focus:outline-none ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
          </label>
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
            <input
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm text-black focus:outline-none ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
          </label>
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm text-black focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
          </label>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
            <input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm text-black shadow-sm focus:outline-none ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
          </label>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Status Messages */}
        {status === "warning" && (
          <p className="text-center font-bold mb-4 rounded-lg bg-red-50 p-2 text-sm text-red-600">
            Please complete all fields.
          </p>
        )}

        {status === "failure" && (
          <p className="text-center font-bold mb-4 rounded-lg bg-red-50 p-2 text-sm text-red-600">
            Registration failed. 🙃
          </p>
        )}

        {status === "success" && (
          <p className="text-center font-bold mb-4 rounded-lg bg-green-50 p-2 text-sm text-green-700">
            Registration successful! 🎉
          </p>
        )}

        {status !== "success" && (
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Register 🚀
          </button>
        )}

        {status === "success" && (
          <button
            onClick={resetForm}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Register another user
          </button>
        )}
      </form>
    </VantaBackground>
  );
}
