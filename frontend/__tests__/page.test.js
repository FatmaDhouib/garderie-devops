import { render, screen } from "@testing-library/react";
import Navbar from "../app/components/Navbar";

describe("Ma Garderie frontend", () => {
  test("affiche le nom Ma Garderie dans la navigation", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("link", { name: /ma garderie/i })
    ).toBeInTheDocument();
  });
});
