import React from 'react'

const FormInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error 
}) => {
  return (
    <div style={styles.formGroup}>
      {label && (
        <label style={styles.label}>
          {label}
          {required && <span style={styles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          ...styles.input,
          ...(error ? styles.inputError : {})
        }}
      />
      {error && <span style={styles.errorText}>{error}</span>}
    </div>
  )
}

const styles = {
  formGroup: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  inputError: {
    borderColor: '#e74c3c'
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  },
  required: {
    color: '#e74c3c',
    marginLeft: '0.25rem'
  }
}

export default FormInput