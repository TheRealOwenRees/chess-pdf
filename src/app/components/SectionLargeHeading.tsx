import { SectionHeadingProps } from "@/types";

const SectionLargeHeading = (props: SectionHeadingProps) => {
  return (
    <div data-testid="heading-div"
         className={`${props.className} mb-4 text-4xl md:text-5xl text-center text-neutral font-extrabold`}
    >
      <h4 data-testid="text">{props.text}
        <span className="text-primary"
              data-testid="accent">{props.textAccent}
        </span>
      </h4>
    </div>
  )
}

export default SectionLargeHeading

