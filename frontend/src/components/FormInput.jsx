import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FormInput = ({ label, name, type = 'text', placeholder, rows = 4 }) => (
  <div className="mb-5">
    <label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">
      {label}
    </label>
    <Field
      as={type === 'textarea' ? 'textarea' : 'input'}
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      rows={type === 'textarea' ? rows : undefined}
      className={type === 'textarea' ? 'soft-input min-h-32 resize-y' : 'soft-input'}
    />
    <ErrorMessage
      name={name}
      component="div"
      className="mt-2 text-sm text-rose-300"
    />
  </div>
);

export default FormInput;
