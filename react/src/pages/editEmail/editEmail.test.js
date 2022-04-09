import '@testing-library/jest-dom/extend-expect';
import EditEmail from "./EditEmail"
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("<Register /> -- Valid Email and Password ", () => {
    test('pass valid email to test email input field', () => {
        render(<EditEmail />);
     
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "mailtestCase@mail.com");
     
        expect(screen.getByTestId("email-input")).toHaveValue("mailtestCase@mail.com");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
      });
  });