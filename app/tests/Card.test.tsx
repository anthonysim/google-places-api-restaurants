import { render, screen } from "@testing-library/react";

import Card from "../components/ui/Card/Card";

describe("Card", () => {
  const mockProps = {
    title: "Test Place",
    description: "123 Main St",
    rating: 4.5,
    placeId: "abc123",
    imageUrl: "/placeholder.svg",
    onClick: jest.fn(),
  };

  it("renders title and description", () => {
    render(<Card {...mockProps} />);
    expect(screen.getByText("Test Place")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
  });
});
