import React from 'react'
import styled, { css } from 'styled-components'
import { ButtonProps } from '../../types'
import { Loader2 } from 'lucide-react'
import { clsx } from 'clsx'

const StyledButton = styled.button<{
  $variant: ButtonProps['variant']
  $size: ButtonProps['size']
  $fullWidth: boolean
  $loading: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  white-space: nowrap;

  /* Size variants */
  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return css`
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          min-height: 2rem;
        `
      case 'large':
        return css`
          padding: 0.875rem 1.5rem;
          font-size: 1.125rem;
          min-height: 3rem;
        `
      default: // medium
        return css`
          padding: 0.75rem 1rem;
          font-size: 1rem;
          min-height: 2.5rem;
        `
    }
  }}

  /* Width */
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  /* Variant styles */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.gray[200]};
          color: ${theme.colors.gray[900]};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray[300]};
          }
          &:active:not(:disabled) {
            background-color: ${theme.colors.gray[400]};
          }
        `
      case 'danger':
        return css`
          background-color: ${theme.colors.danger};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: #c82333;
          }
          &:active:not(:disabled) {
            background-color: #bd2130;
          }
        `
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.gray[700]};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray[100]};
          }
          &:active:not(:disabled) {
            background-color: ${theme.colors.gray[200]};
          }
        `
      default: // primary
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: #0056b3;
          }
          &:active:not(:disabled) {
            background-color: #004085;
          }
        `
    }
  }}

  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Focus state */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Loading state */
  ${({ $loading }) =>
    $loading &&
    css`
      cursor: not-allowed;
      pointer-events: none;
    `}
`

const LoadingSpinner = styled(Loader2)`
  animation: spin 1s linear infinite;
  width: 1rem;
  height: 1rem;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  children,
  className,
  testId,
  ...props
}) => {
  const isDisabled = disabled || loading

  return (
    <StyledButton
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      className={clsx(className)}
      data-testid={testId}
      {...props}
    >
      {loading && <LoadingSpinner data-testid="loading-spinner" />}
      {children}
    </StyledButton>
  )
}