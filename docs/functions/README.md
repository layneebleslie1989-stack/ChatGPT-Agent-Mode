# Function Documentation

This directory contains comprehensive documentation for all utility functions, helpers, and reusable code in the project.

## 📋 Overview

Our functions are designed to be pure, well-tested, and thoroughly documented. Each function includes detailed documentation with parameters, return values, and usage examples.

## 🏗️ Function Categories

### Utility Functions
- [String Utilities](./utilities/string.md) - String manipulation and validation
- [Date Utilities](./utilities/date.md) - Date formatting and manipulation
- [Array Utilities](./utilities/array.md) - Array processing and transformation
- [Object Utilities](./utilities/object.md) - Object manipulation and validation
- [Number Utilities](./utilities/number.md) - Number formatting and calculations

### Validation Functions
- [Form Validation](./utilities/validation.md) - Input validation helpers
- [Data Validation](./utilities/dataValidation.md) - Data structure validation
- [Type Guards](./utilities/typeGuards.md) - TypeScript type guard functions

### API Helpers
- [HTTP Utilities](./utilities/http.md) - HTTP request helpers
- [Error Handling](./utilities/errorHandling.md) - Error processing utilities
- [Response Formatters](./utilities/responseFormatters.md) - API response formatting

### Performance Utilities
- [Debounce/Throttle](./utilities/performance.md) - Performance optimization helpers
- [Memoization](./utilities/memoization.md) - Caching and memoization utilities
- [Lazy Loading](./utilities/lazyLoading.md) - Lazy loading helpers

## 📖 Documentation Standards

### Function Documentation Template

Each function should be documented with:

```typescript
/**
 * Brief description of what the function does
 * 
 * @param paramName - Description of the parameter
 * @param optionalParam - Description of optional parameter (optional)
 * @returns Description of the return value
 * 
 * @example
 * ```typescript
 * const result = functionName('example', { option: true });
 * console.log(result); // Expected output
 * ```
 * 
 * @throws {ErrorType} When this error condition occurs
 * @since 1.0.0
 */
export function functionName(
  paramName: string,
  optionalParam?: Options
): ReturnType {
  // Implementation
}
```

### JSDoc Tags Reference

| Tag | Purpose | Example |
|-----|---------|---------|
| `@param` | Parameter description | `@param name - User's full name` |
| `@returns` | Return value description | `@returns The formatted string` |
| `@throws` | Exception description | `@throws {Error} When input is invalid` |
| `@example` | Usage example | `@example const result = fn('test');` |
| `@since` | Version introduced | `@since 1.2.0` |
| `@deprecated` | Deprecation notice | `@deprecated Use newFunction instead` |

## 🔧 Function Design Principles

### Pure Functions
Functions should be pure when possible:

```typescript
// ✅ Pure function - same input always produces same output
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// ❌ Impure function - depends on external state
let taxRate = 0.08;
export function calculateTotal(amount: number): number {
  return amount * (1 + taxRate); // Depends on external variable
}
```

### Error Handling
Functions should handle errors gracefully:

```typescript
/**
 * Safely parses JSON string with fallback
 */
export function safeJsonParse<T>(
  jsonString: string,
  fallback: T
): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.warn('Failed to parse JSON:', error);
    return fallback;
  }
}
```

### Type Safety
Use TypeScript for better type safety:

```typescript
// Generic function with constraints
export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    groups[groupKey] = groups[groupKey] || [];
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}
```

## 📚 Usage Examples

### String Utilities Example
```typescript
import { 
  capitalize, 
  slugify, 
  truncate,
  isValidEmail 
} from '@/utils/string';

// Capitalize first letter
const title = capitalize('hello world'); // "Hello world"

// Create URL-friendly slug
const slug = slugify('My Blog Post Title!'); // "my-blog-post-title"

// Truncate long text
const summary = truncate('This is a very long text...', 50); // "This is a very long text..."

// Validate email
const isValid = isValidEmail('user@example.com'); // true
```

### Array Utilities Example
```typescript
import { 
  chunk, 
  unique, 
  groupBy,
  sortBy 
} from '@/utils/array';

const users = [
  { id: 1, name: 'John', role: 'admin' },
  { id: 2, name: 'Jane', role: 'user' },
  { id: 3, name: 'Bob', role: 'admin' }
];

// Split array into chunks
const chunks = chunk(users, 2); // [[user1, user2], [user3]]

// Get unique values
const roles = unique(users.map(u => u.role)); // ['admin', 'user']

// Group by property
const byRole = groupBy(users, 'role');
// { admin: [user1, user3], user: [user2] }

// Sort by property
const sorted = sortBy(users, 'name'); // Sorted by name
```

### Validation Example
```typescript
import { 
  validateRequired,
  validateEmail,
  validateMinLength,
  combineValidators 
} from '@/utils/validation';

// Individual validators
const emailValidator = combineValidators([
  validateRequired('Email is required'),
  validateEmail('Invalid email format')
]);

const passwordValidator = combineValidators([
  validateRequired('Password is required'),
  validateMinLength(8, 'Password must be at least 8 characters')
]);

// Usage in form validation
const errors = {
  email: emailValidator('user@example.com'), // null (valid)
  password: passwordValidator('123'), // 'Password must be at least 8 characters'
};
```

## 🧪 Testing Functions

### Unit Testing Example
```typescript
import { describe, it, expect } from 'vitest';
import { formatCurrency, calculateDiscount } from './math';

describe('Math Utilities', () => {
  describe('formatCurrency', () => {
    it('formats USD currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('formats EUR currency correctly', () => {
      expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
    });

    it('handles zero amount', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });
  });

  describe('calculateDiscount', () => {
    it('calculates percentage discount correctly', () => {
      expect(calculateDiscount(100, 10)).toBe(90);
    });

    it('handles zero discount', () => {
      expect(calculateDiscount(100, 0)).toBe(100);
    });

    it('throws error for invalid discount', () => {
      expect(() => calculateDiscount(100, -10)).toThrow('Invalid discount');
    });
  });
});
```

### Property-Based Testing
```typescript
import { fc, test } from 'fast-check';
import { clamp } from './math';

describe('clamp function properties', () => {
  test('clamp always returns value within bounds', () => {
    fc.assert(fc.property(
      fc.integer(),
      fc.integer(),
      fc.integer(),
      (value, min, max) => {
        fc.pre(min <= max); // Precondition
        const result = clamp(value, min, max);
        return result >= min && result <= max;
      }
    ));
  });
});
```

## 📋 Function Checklist

When creating a new function, ensure:

- [ ] Function has a clear, descriptive name
- [ ] JSDoc documentation is complete
- [ ] TypeScript types are properly defined
- [ ] Function is pure when possible
- [ ] Error cases are handled appropriately
- [ ] Unit tests are written
- [ ] Examples are provided
- [ ] Performance considerations are addressed

## 🔗 Related Resources

- [TypeScript Guidelines](../guides/typescript.md)
- [Testing Guide](../guides/testing.md)
- [Performance Best Practices](../guides/performance.md)
- [Code Style Guide](../guides/code-style.md)