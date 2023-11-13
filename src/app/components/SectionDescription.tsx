import { SectionHeadingProps } from "@/types";

const SectionDescription = (props: SectionHeadingProps) => {
  return (
    <div className={`${props.className} mb-8 text-center text-gray-600 font-semibold w-1/2`}
         data-cy="description-div"
    >
      <h5 data-cy="text">{props.text}</h5>
    </div>
  )
}

export default SectionDescription