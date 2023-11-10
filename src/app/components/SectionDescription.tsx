import { SectionHeadingProps } from "@/types";

const SectionDescription = (props: SectionHeadingProps) => {
  return (
    <div className={`${props.className} mb-8 text-center text-gray-600 font-semibold w-1/2`}>
      <h5>{props.text}</h5>
    </div>
  )
}

export default SectionDescription