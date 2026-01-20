import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import SectionLargeHeading from "@/app/components/SectionLargeHeading";

describe("Section Large Heading", () => {
  beforeEach(() => {
    render(
      <SectionLargeHeading
        text="Test Heading"
        className="test-class"
        textAccent=" accent"
      />,
    );
  });

  it("should render the text with classname", () => {
    expect(screen.getByTestId("text").textContent).toContain("Test Heading");
    expect(screen.getByTestId("heading-div").className).toContain("test-class");
    expect(screen.getByTestId("accent").textContent).toContain("accent");
    expect(screen.getByTestId("accent").className).toContain("text-primary");
  });
});
