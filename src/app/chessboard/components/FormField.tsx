import { useAtom } from "jotai";

import { gameAtom } from "@/atoms";
import usePgn from "@/hooks/usePgn";
import { FormFieldProps } from "@/types";

const FormField = ({ fieldName, type }: FormFieldProps) => {
  const [gameState] = useAtom(gameAtom);
  const { updateHeaders } = usePgn();
  const { headers } = gameState;

  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text capitalize">{fieldName}</span>
      </div>
      <input
        className="input input-bordered focus:input-primary"
        type={type}
        id={fieldName}
        value={headers[fieldName]}
        onChange={(e) => updateHeaders(e, fieldName)}
      />
    </label>
  );
};

export default FormField;
