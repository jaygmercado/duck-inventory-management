import React from 'react'

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  touched?: boolean;
  errors?: string | null;
}

const TextArea: React.FC<InputProps> = ({ touched, errors, ...props }) => (
  <div>
    <textarea className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      rows={4} {...props} />
    {touched && errors && (
      <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">{errors}</p>
    )}
  </div>
)

export default TextArea