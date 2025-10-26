import React from 'react'
import styled, { css } from 'styled-components'
import { InputProps } from '../../types'
import { clsx } from 'clsx'

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[700]};
`

const StyledInput = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme, $hasError }) => 
    $hasError ? theme.colors.danger : theme.colors.gray[300]
  };
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray[900]};
  background-color: ${({ theme }) => theme.colors.white};
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) => 
      $hasError ? theme.colors.danger : theme.colors.primary
    };
    box-shadow: 0 0 0 3px ${({ theme, $hasError }) => 
      $hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(0, 123, 255, 0.1)'
    };
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.gray[500]};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`

const ErrorMessage = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.danger};
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  error,
  label,
  className,
  testId,
  ...props
}) => {
  const hasError = Boolean(error)

  return (
    <InputContainer className={className}>
      {label && (
        <Label>
          {label}
          {required && <span style={{ color: 'red', marginLeft: '0.25rem' }}>*</span>}
        </Label>
      )}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        $hasError={hasError}
        data-testid={testId}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  )
}