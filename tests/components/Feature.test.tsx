import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Feature from "@/app/components/Feature";

describe("Feature", () => {
  beforeEach(() => {
    render(<Feature title="Test Title" text="Test Text" />);
  });

  it("should render the title and text", () => {
    expect(screen.getByTestId("title").textContent).toEqual("Test Title");
    expect(screen.getByTestId("text").textContent).toEqual("Test Text");
  });
});
