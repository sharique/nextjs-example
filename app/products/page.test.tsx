import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductsList from "../ProductsList";
import "vitest-dom/extend-expect";

const mockProducts = [
  {
    id: 1,
    name: "Test Product 1",
    description: "Test Description 1",
    price: 99.99,
    image: "test-image-1.jpg",
  },
  {
    id: 2,
    name: "Test Product 2",
    description: "Test Description 2",
    price: 149.99,
    image: "test-image-2.jpg",
  },
];

describe("ProductsList", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders product list correctly", () => {
    render(<ProductsList products={mockProducts} initialCartProducts={[]} />);
    screen.debug();

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    });
  });

  it("handles add to cart click", async () => {
    const user = userEvent.setup();
    const handleAddToCart = vi.fn();

    render(<ProductsList products={mockProducts} initialCartProducts={[]} />);

    const addButtons = screen.getAllByText("Add to Cart");
    // await user.click(addButtons[0]);

    expect(handleAddToCart).toHaveBeenCalledWith(mockProducts[0]);
  });
});
