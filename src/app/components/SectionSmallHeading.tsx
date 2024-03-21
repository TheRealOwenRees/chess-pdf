import { SectionHeadingProps } from "@/types";

const SectionSmallHeading = (props: SectionHeadingProps) => {
  return (
    <div className={`${props.className} text-lg text-center text-primary font-bold mb-4 tracking-wider`}
         data-testid="heading-div"
    >
        <h3 data-testid="text">{props.text}</h3>
      </div>
  )
}

export default SectionSmallHeading
