import { FormFieldProps } from "@/types";
import { useGameContext } from "@/context/GameContext";
import { handleInputChange } from "@/handlers/contactHandlers";

const FormField = ({ fieldName, type } : FormFieldProps) => {
  const { gameState, gameDispatch } = useGameContext()

  return (
    <div className="flex flex-col w-full text-left">
      <label className="block capitalize mb-2 text-sm font-medium text-gray-900" htmlFor={fieldName}>{fieldName}</label>
      <input className="block p-2.5 border border-gray-500 text-gray-900 text-sm rounded-lg focus:border-primary-500 focus:ring-primary-500 shadow-sm"
             type={type}
             id={fieldName}
             value={gameState.headers[fieldName]} onChange={(e) => handleInputChange(e, gameState, gameDispatch, fieldName)} />
    </div>
  )
}

export default FormField