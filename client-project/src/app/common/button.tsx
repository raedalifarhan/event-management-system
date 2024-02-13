import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  loading?: boolean;
  content?: string;
  name?: string;
  disabled?: boolean;
}

const Button = ({ value, loading, className, content, type, name, disabled, onClick }: Props) => {
  return (
    <button
      disabled={disabled}
      name={name}
      type={type}
      className={className}
      onClick={onClick}
    >
      {loading && (
        <svg
          aria-hidden="true"
          role="status"
          className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Your SVG content */}
        </svg>
      )}
      {loading ? content : value}
    </button>
  );
};

export default Button;
