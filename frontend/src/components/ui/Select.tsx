import React from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
  id?: string
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  required = false,
  disabled = false,
  className = '',
  id
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`

  const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors'
  const normalClasses = 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
  const errorClasses = 'border-red-300 focus:ring-red-500 focus:border-red-500'
  const disabledClasses = 'bg-gray-100 cursor-not-allowed'

  const selectClasses = `${baseClasses} ${error ? errorClasses : normalClasses} ${disabled ? disabledClasses : ''} ${className}`

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={selectClasses}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}