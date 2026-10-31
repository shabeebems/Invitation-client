import type { ReactNode } from "react";

type AuthFieldProps = {
  label: string;
  icon: ReactNode;
  type?: string;
  name?: string;
  autoComplete?: string;
  value: string;
  placeholder: string;
  error?: string;
  trailing?: ReactNode;
  onChange: (value: string) => void;
};

export default function AuthField({
  label,
  icon,
  type = "text",
  name,
  autoComplete,
  value,
  placeholder,
  error,
  trailing,
  onChange,
}: AuthFieldProps) {
  return (
    <label className="auth-field">
      {label}
      <span className="auth-control">
        <span className="auth-icon">{icon}</span>
        <input
          type={type}
          name={name}
          autoComplete={autoComplete}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
        {trailing}
      </span>
      {error ? <span className="auth-error">{error}</span> : null}
    </label>
  );
}
