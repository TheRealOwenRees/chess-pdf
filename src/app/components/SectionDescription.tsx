import { SectionHeadingProps } from "@/types";

const SectionDescription = (props: SectionHeadingProps) => {
  return (
    <div className={`${props.className} mb-8 text-center text-neutral font-semibold w-1/2`}
         data-testid="description-div"
    >
      <h5 data-testid="text">{props.text}</h5>
    </div>
  )
}

export default SectionDescription
