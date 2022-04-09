import '@testing-library/jest-dom/extend-expect';
import EditPassword from "./EditPassword"
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("<Register /> -- Valid Email and Password ", () => {
    test('pass valid email to test email input field', () => {
        render(<EditPassword />);
     
        const inputEl = screen.getByTestId("password-input");
        userEvent.type(inputEl, "password");
     
        expect(screen.getByTestId("password-input")).toHaveValue("password");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
      });
  });