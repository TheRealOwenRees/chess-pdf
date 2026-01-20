import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import SectionDescription from "@/app/components/SectionDescription";

describe("Section Small Heading", () => {
  beforeEach(() => {
    render(<SectionDescription text="Test Heading" className="test-class" />);
  });

  it("should render the text with classname", () => {
    expect(screen.getByTestId("text").textContent).toEqual("Test Heading");
    expect(screen.getByTestId("description-div").className).toContain(
      "test-class",
    );
  });
});
