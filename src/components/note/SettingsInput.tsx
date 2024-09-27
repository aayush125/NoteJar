export default function SettingsInput({
  label,
  name,
  placeholder,
  isPassword = false,
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  isPassword?: boolean;
  required?: boolean;
}) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={isPassword ? "password" : "text"}
        name={name}
        required={required}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
      />
    </label>
  );
}
