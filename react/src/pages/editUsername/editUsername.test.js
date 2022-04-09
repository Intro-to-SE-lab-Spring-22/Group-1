import '@testing-library/jest-dom/extend-expect';
import EditUsername from "./EditUsername"
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("<Register /> -- Valid Email and Password ", () => {
    test('pass valid email to test email input field', () => {
        render(<EditUsername />);
     
        const inputEl = screen.getByTestId("username-input");
        userEvent.type(inputEl, "testUser");
     
        expect(screen.getByTestId("username-input")).toHaveValue("testUser");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
      });
  });