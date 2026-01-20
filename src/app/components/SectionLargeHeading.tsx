import { SectionHeadingProps } from "@/types";

const SectionLargeHeading = (props: SectionHeadingProps) => {
  return (
    <div
      data-testid="heading-div"
      className={`${props.className} mb-4 text-center text-4xl font-extrabold text-neutral md:text-5xl`}
    >
      <h4 data-testid="text">
        {props.text}
        <span className="text-primary" data-testid="accent">
          {props.textAccent}
        </span>
      </h4>
    </div>
  );
};

export default SectionLargeHeading;
