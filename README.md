# Registration Form with Client-Side Validation

A **Next.js + TypeScript** registration form with **client-side validation** and **automated tests** using **Jest** and **React Testing Library**.  
It provides clear form feedback across multiple states — `idle`, `warning`, `failure`, and `success`.

---

## Approach to Solving the Problem

### 1. Building the Form

- Created a clean and centered form UI using **Tailwind CSS** for styling and responsiveness.
- Managed all user inputs through React’s `useState` hooks.
- Implemented Vanta.js Globe for interactive 3D background.

### 2. Client-side Validation Logic

- Implemented helper functions to validate inputs directly in the component:
  - `isRequired` — ensures all fields are filled.
  - `isGmail` — restricts email domains to Gmail only.
  - `isUniqueEmail` — blocks `test@gmail.com` to simulate a uniqueness check.
  - `isValidPassword` — enforces password complexity (8–30 characters, upper/lowercase, number, special character).
- Validation runs before submission, and the `status` updates dynamically:
  - **idle** — initial state
  - **warning** — when fields are missing or invalid
  - **failure** — when email uniqueness fails
  - **success** — when registration passes all checks

### 3. Status Feedback

- Status-based messages display clearly above the form buttons.
- On success, the submit button changes to a “Register another user” button that resets the form.

---

## Testing Strategy

The project includes **unit tests** written with **Jest** and **React Testing Library**, ensuring form behavior is correct for all key user scenarios.

**Test coverage includes:**

1. **Render tests** — confirms all input fields are displayed.
2. **Warning state** — ensures submitting empty fields triggers a warning.
3. **Failure state** — validates that a duplicate email (`test@gmail.com`) shows an appropriate error message.
4. **Success state** — confirms a valid submission displays a success message.

## How Much AI Did I Use?

AI (ChatGPT & Gemini) was used primarily as a **pair programming assistant** to:

- Help troubleshoot broken code, e.g. syntax issues, implementing new frameworks not included in Codesandbox template (Jest & Vanta)
- Help refactor working code
- Learn about and implement Jest (the only other testing framework I had used before this was Vitest)

All logic, integration, and debugging were done manually with iterative adjustments and testing in CodeSandbox.

---

## Areas for Improvement

If I had more time, here’s where I could make this better:

1. **Refactor Validation Logic**  
   Move validation into a separate custom hook (`useFormValidation`) to make the code cleaner and reusable.

2. **Stronger Accessibility Support**  
   Add ARIA attributes and improve focus management for error states.

3. **Backend Integration**  
   Connect the form to a backend endpoint for real email uniqueness and registration handling. Checkout https://github.com/eugene-yeooo for examples of my full-stack work (Node.js + Express + SQLite3).

---

## Tech Stack

- **Next.js (App Router)**
- **React** + **TypeScript**
- **Tailwind CSS**
- **Vanta.js (background Effect)**
- **Client-side validation only**

---

## Running the Project

```bash
npm install
npm run dev
npm test
```
