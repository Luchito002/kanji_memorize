import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  icon?: React.ReactNode
}

export default function Button({
  children,
  loading = false,
  icon,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-medium
        bg-blue-600 hover:bg-blue-700 active:bg-blue-800
        disabled:opacity-60 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        transition-all duration-200 ${className}`}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : (
        icon && <span className="flex items-center">{icon}</span>
      )}
      <span>{loading ? "Cargando..." : children}</span>
    </button>
  )
}
