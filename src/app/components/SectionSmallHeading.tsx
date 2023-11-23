import { SectionHeadingProps } from "@/types";

const SectionSmallHeading = (props: SectionHeadingProps) => {
  return (
    <div className={`${props.className} text-lg text-center text-primary-500 font-bold mb-4 tracking-wider`}
         data-test="heading-div"
    >
        <h3 data-test="text">{props.text}</h3>
      </div>
  )
}

export default SectionSmallHeading