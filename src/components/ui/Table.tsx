import React from 'react'
import styled from 'styled-components'
import { clsx } from 'clsx'

interface Column<T> {
  key: keyof T
  title: string
  render?: (value: any, item: T) => React.ReactNode
  sortable?: boolean
  width?: string
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  emptyMessage?: string
  className?: string
  testId?: string
}

const TableContainer = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.white};
`

const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.colors.gray[50]};
`

const TableHeaderCell = styled.th<{ $sortable?: boolean; $width?: string }>`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[700]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  width: ${({ $width }) => $width || 'auto'};
  cursor: ${({ $sortable }) => ($sortable ? 'pointer' : 'default')};
  user-select: none;

  &:hover {
    background-color: ${({ theme, $sortable }) => 
      $sortable ? theme.colors.gray[100] : 'transparent'
    };
  }
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }
`

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.gray[900]};
`

const LoadingRow = styled.tr`
  td {
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.gray[500]};
  }
`

const EmptyRow = styled.tr`
  td {
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.gray[500]};
    font-style: italic;
  }
`

export function Table<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No data available',
  className,
  testId,
}: TableProps<T>) {
  if (loading) {
    return (
      <TableContainer className={className} data-testid={testId}>
        <StyledTable>
          <TableHeader>
            <tr>
              {columns.map((column, index) => (
                <TableHeaderCell key={index} $width={column.width}>
                  {column.title}
                </TableHeaderCell>
              ))}
            </tr>
          </TableHeader>
          <TableBody>
            <LoadingRow>
              <TableCell colSpan={columns.length}>Loading...</TableCell>
            </LoadingRow>
          </TableBody>
        </StyledTable>
      </TableContainer>
    )
  }

  if (data.length === 0) {
    return (
      <TableContainer className={className} data-testid={testId}>
        <StyledTable>
          <TableHeader>
            <tr>
              {columns.map((column, index) => (
                <TableHeaderCell key={index} $width={column.width}>
                  {column.title}
                </TableHeaderCell>
              ))}
            </tr>
          </TableHeader>
          <TableBody>
            <EmptyRow>
              <TableCell colSpan={columns.length}>{emptyMessage}</TableCell>
            </EmptyRow>
          </TableBody>
        </StyledTable>
      </TableContainer>
    )
  }

  return (
    <TableContainer className={className} data-testid={testId}>
      <StyledTable>
        <TableHeader>
          <tr>
            {columns.map((column, index) => (
              <TableHeaderCell
                key={index}
                $sortable={column.sortable}
                $width={column.width}
              >
                {column.title}
              </TableHeaderCell>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key] || '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  )
}