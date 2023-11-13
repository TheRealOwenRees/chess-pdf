import { SectionHeadingProps } from "@/types";

const SectionSmallHeading = (props: SectionHeadingProps) => {
  return (
    <div className={`${props.className} text-lg text-center text-primary-500 font-bold mb-4 tracking-wider`}
         data-cy="heading-div"
    >
        <h3 data-cy="text">{props.text}</h3>
      </div>
  )
}

export default SectionSmallHeading