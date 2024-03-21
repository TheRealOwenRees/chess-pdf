import { FeatureProps } from "@/types";

const Feature = (props: FeatureProps) => {
  return (
    <div className="mb-auto">
      <h6 className="font-bold text-secondary-600 text-2xl" data-testid="title">{props.title}</h6>
      <p className="text-secondary-300 font-medium" data-testid="text">{props.text}</p>
    </div>
  )
}

export default Feature
