import { SectionHeadingProps } from "@/types";

const SectionLargeHeading = (props: SectionHeadingProps) => {
  return (
    <div className={`${props.className} text-4xl md:text-5xl text-center text-secondary-600 font-extrabold`}>
      <h4>{props.text} <span className="text-primary-500">{props.textAccent}</span></h4>
    </div>
  )
}

export default SectionLargeHeading

