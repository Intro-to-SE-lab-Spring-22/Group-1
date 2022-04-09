import '@testing-library/jest-dom/extend-expect';
import Login from "./login"
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("<Login /> -- Valid Email and Password Passed ", () => {
    test('pass valid email to test email input field', () => {
        render(<Login />);
     
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "mailtestCase@mail.com");
     
        expect(screen.getByTestId("email-input")).toHaveValue("mailtestCase@mail.com");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
      });

      test('password cannot be blank', () => {
        render(<Login />);
     
        const inputEl = screen.getByTestId("password-input");
        userEvent.type(inputEl, "pass");

        expect(screen.getByTestId("password-input")).toHaveValue();
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
      });

  });