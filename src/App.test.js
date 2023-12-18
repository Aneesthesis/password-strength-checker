import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

afterEach(() => {
  cleanup();
});
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/name/i);
  expect(linkElement).toBeInTheDocument();
});
