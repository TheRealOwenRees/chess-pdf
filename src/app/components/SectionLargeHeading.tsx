import { SectionHeadingProps } from "@/types";

const SectionLargeHeading = (props: SectionHeadingProps) => {
  return (
    <div data-test="heading-div"
         className={`${props.className} mb-4 text-4xl md:text-5xl text-center text-base-content font-extrabold`}
    >
      <h4 data-test="text">{props.text}
        <span className="text-primary"
              data-test="accent">{props.textAccent}
        </span>
      </h4>
    </div>
  )
}

export default SectionLargeHeading

