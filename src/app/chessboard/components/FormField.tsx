import { FormFieldProps } from "@/types";

import { useAtom } from "jotai/index";
import { gameAtom } from "@/atoms";

import { handleInputChange } from "@/handlers/contactHandlers";

const FormField = ({ fieldName, type } : FormFieldProps) => {
  const [gameState, gameDispatch] = useAtom(gameAtom)
  const { headers } = gameState

  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text capitalize">{fieldName}</span>
      </div>
      <input className="input input-bordered focus:input-primary"
              type={type}
              id={fieldName}
              value={headers[fieldName]} onChange={(e) => handleInputChange(e, gameState, gameDispatch, fieldName)}
      />
    </label>
  )
}

export default FormField