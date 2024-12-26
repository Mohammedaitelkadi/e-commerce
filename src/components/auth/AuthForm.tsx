import React from 'react';

interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

export function FormField({ label, type, id, value, onChange, error, required = true }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm
          ${error ? 'border-red-300' : 'border-gray-300'}`}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}