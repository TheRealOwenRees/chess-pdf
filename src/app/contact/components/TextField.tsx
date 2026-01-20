import { TextFieldProps } from "@/types";

const TextField = ({
  label,
  name,
  placeholder,
  pattern,
  required,
  minLength,
  maxLength,
  errors,
  register,
}: TextFieldProps) => {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full focus:input-primary"
        {...register(name, {
          required: required,
          pattern: pattern,
          minLength: minLength,
          maxLength: maxLength,
        })}
        aria-invalid={errors[name] ? "true" : "false"}
      />
      {errors[name] && (
        <span role="alert" className="text-error">
          {errors[name].message}
        </span>
      )}
    </label>
  );
};

export default TextField;
