"use client";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "./page";

describe("Registration Page", () => {
  test("renders all input fields", () => {
    render(<Page />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("shows warning for empty submission", async () => {
    render(<Page />);
    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText(/please complete all fields/i)).toBeInTheDocument();
  });

  test("shows failure for duplicate email", async () => {
    render(<Page />);

    await userEvent.type(screen.getByLabelText(/email/i), "test@gmail.com");

    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
  });

  test("shows success for valid submission", async () => {
    render(<Page />);

    await userEvent.type(screen.getByLabelText(/first name/i), "Jane");
    await userEvent.type(screen.getByLabelText(/last name/i), "Smith");
    await userEvent.type(screen.getByLabelText(/email/i), "jane@gmail.com");
    await userEvent.type(screen.getByLabelText(/password/i), "Abc12345!");

    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
  });
});
