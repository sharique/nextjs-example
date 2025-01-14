import { expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";
import { describe } from "node:test";
import "vitest-dom/extend-expect";

test("Page", () => {
  render(<Home />);
  screen.debug();

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Welcome to Example ecommerce app.",
    }),
  ).toBeDefined();
});

describe("Home", () => {
  it("renders footer", () => {
    render(<Home />);
    const footer = screen.getByRole("footer");
    expect(footer).toBeInTheDocument();
  });
});
