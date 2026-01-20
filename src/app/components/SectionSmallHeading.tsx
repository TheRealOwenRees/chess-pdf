import { SectionHeadingProps } from "@/types";

const SectionSmallHeading = (props: SectionHeadingProps) => {
  return (
    <div
      className={`${props.className} mb-4 text-center text-lg font-bold tracking-wider text-primary`}
      data-testid="heading-div"
    >
      <h3 data-testid="text">{props.text}</h3>
    </div>
  );
};

export default SectionSmallHeading;
