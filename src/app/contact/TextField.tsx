import { TextFieldProps } from "@/types";

const TextField = ({ label, name, placeholder, pattern, required, minLength, maxLength, errors, register } : TextFieldProps) => {
  return (
    <>
      <label
        className="block capitalize text-sm font-medium text-gray-900"
        htmlFor={name}>{label}
      </label>
      <input
        placeholder={placeholder}
        className="block p-2.5 border border-gray-500 text-gray-900 text-sm rounded-lg focus:border-primary-500 focus:ring-primary-500 shadow-sm placeholder-gray-500"
        {...register(name, { required: required, pattern: pattern, minLength: minLength, maxLength: maxLength })}
        aria-invalid={ errors[name] ? "true" : "false" }
      />
      { errors[name] && <span role="alert" className="text-red-700">{ errors[name].message }</span> }
    </>
  )
}

export default TextField